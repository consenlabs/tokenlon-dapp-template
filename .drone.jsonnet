local utils = import 'utils.jsonnet';
local repo = 'otc-dapp';
[{
  kind: 'pipeline',
  name: repo,
  trigger: utils.default_trigger,
  volumes: utils.volumes(repo),
  steps: [
    utils.node('build',
                 ['npm i -g yarn'], {}, version="10.15.3"),
  ] + utils.default_publish(repo) + [
    //deploy to develop
    utils.deploy('deploy-develop',
                 'dev',
                 'biz',
                 repo,
                 utils.adjust_deployment([
                   'otc-dapp',
                 ], 'dev'),
                 { branch: ['feature/*','hotfix/*', 'develop'], event: 'push' }),

    //deploy to staging
    utils.deploy('deploy-staging',
                 'staging',
                 'biz',
                 repo,
                 utils.adjust_deployment([
                   'otc-dapp',
                 ], 'staging'),
                 { branch: ['release/*'], event: 'push' })
    ,
    utils.default_slack,
  ],
  services: [],
}] + utils.default_secrets
