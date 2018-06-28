# _Deploy_ Manual

1. Realize suas modificações em sua _branch_;
1. Atualize a versão da imagem no arquivo `docker/production/build.yml`:

    ```yml
    # build.yml
    version: "3.6"

    services:
      production:
        image: besouro/app:0.1.0 # <--- Atualize aqui
        build:
          args:
            api_url: api.dev.besouro.ejplatform.org
          context: ../../
          dockerfile: ./docker/production/Dockerfile
    ```
1. Realize o merge para a _branch_ `develop`;
1. Espere o pipeline do CI finalizar ([link](https://gitlab.com/unidoscontraacorrupcao/besouro-app/pipelines));
1. Acesse o _deployment_ do _app_ no [GKE](https://console.cloud.google.com/kubernetes/deployment/us-central1-a/besouro-staging/gitlab-managed-apps/besouro-app?project=besouro-207223);
1. Clique em `Actions` -> `Rolling Update`;
1. Atualize a versão da imagem do app para a versão que você configurou nos arquivos `.yml`;
1. Clique em `Update`;
1. Acesse o ambiente de [homologação](http://dev.besouro.ejplatform.org/login).
