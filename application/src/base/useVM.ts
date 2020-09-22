import { useState, useEffect } from 'react'
import { useAsObservableSource } from 'mobx-react'
import StoreViewModel from './StoreViewModel'

function useVM<VM extends StoreViewModel<P>, P, T>(
  ViewModel: new (props: P, context?: T) => VM,
  props: P,
  context?: T
) {
  const observableProps = useAsObservableSource(props)
  const [vm] = useState(() => new ViewModel(observableProps, context))

  useEffect(() => {
    return () => {
      vm.dispose()
    }
  }, [vm])

  return vm
}

export { useVM }
