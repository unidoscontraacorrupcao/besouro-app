/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

import "@polymer/app-layout/app-grid/app-grid-style.js";
import { html } from "@polymer/polymer/lib/utils/html-tag.js";
class HelpPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    </style>
    <style>
      :host {
          --app-grid-columns: 2;
          display: block;
          background: #f5f5f5;
          flex-direction: column;
          min-height: 100vh;
        }
        app-header-layout {
          height: 100vh;
        }
        p, ul {
          font-family: helvetica-neue;
          font-size: 16px;
          color: #333333;
          text-transform: uppercase;
        }
        app-header {
          color: var(--default-primary-color);
          background-color: var(--accent-color);
        }
        div[main-title] {
          margin-left: 20px;
          font-family: Folio;
          font-size: 30px;
          text-transform: uppercase;
        }
        strong {
          color: var(--secondary-text-color);
          font-family: Folio;
        }
        .content {
          padding: 10px 20px;
        }
    </style>
    
    <app-header-layout has-scrolling-region>
      <app-header slot="header" condenses reveals fixed effects="waterfall">
        <app-toolbar>
          <paper-icon-button class="header-icon" icon="app:arrow-back" on-tap="_redirectToInbox"></paper-icon-button>
          <div main-title >Ajuda</div>
          <!-- <paper-icon-button class="header-icon" icon="app:search"></paper-icon-button> -->
        </app-toolbar>
      </app-header>
        <div class="content">
          <p><strong>O que é a campanha Unidos Contra a Corrupção?</strong><br />
          A Campanha Unidos contra a Corrupção é uma ação para promover as Novas Medidas contra a Corrupção e para que eleitores e candidatos trabalhem juntos por um novo Congresso Nacional de 2019 comprometido com esta luta.</p>

          <p><strong>Quem está responsável pela campanha?</strong><br />
          O responsável pela campanha é uma coalizão de organizações sociais apartidárias e com longa trajetória de combate à corrupção no país, a saber, Contas Abertas, Instituto Cidade Democrática, Instituto Ethos, Movimento de Combate à Corrupção Eleitoral-MCCE, Observatório Social do Brasil e Transparência Internacional - Brasil.</p>

          <p><strong>Quais as fases da campanha?</strong><br />
          A campanha tem 3 fases. A primeira tem como objetivo divulgar as Novas Medidas e coletar assinaturas dos brasileiros e brasileiras que apoiam essa agenda! Depois, a segunda fase busca comprometer candidatos e candidatas, pedindo que se cadastrem na campanha e declarem seu compromisso contra a corrupção, sua defesa da democracia e seu passado limpo.</p>

          <p>A terceira fase será o momento em que a sociedade poderá conhecer os candidatos e candidatas que se comprometeram com a campanha, pressionar aqueles que ainda não tiverem aderido e ajudar a eleger um Congresso que implemente e avance com essa agenda.</p>

          <p><strong>O que são as Novas Medidas?</strong><br />
          Trata-se do maior pacote de medidas anticorrupção já produzido no mundo. Ele agrega 70 projetos de lei, propostas de emenda constitucional e resoluções administrativas para promover melhorias na capacidade de o Brasil enfrentar de maneira sistêmica o problema da corrupção. Esta resposta se reflete nas diferentes abordagens que compõem o pacote: prevenção, controle e participação social, educação, investidura de agentes públicos, transparência e acesso à informação, desburocratização, responsabilidade e democracia partidária, desenvolvimento institucional, integridade empresarial, detecção, investigação, sanção, articulação interinstitucional, cooperação internacional e recuperação de ativos.</p>

          <p><strong>Por que este pacote foi desenvolvido?</strong><br />
          Nenhum país no mundo conseguiu reduzir significativamente os índices de corrupção sem atuar de maneira sistêmica sobre o problema. O debate sobre a corrupção no Brasil vem sofrendo com a polarização política exacerbada e o foco limitado às operações de investigação e processos judiciais de grandes nomes nacionais. Logo, a atenção sobre as causas e soluções estruturais têm ficado à margem. Com esta iniciativa, desejamos trazer novamente o debate para respostas que possam contribuir para uma mudança de patamar significativa e duradoura no controle da corrupção no Brasil.</p>

          <p><strong>Como se deu a construção coletiva das Novas Medidas?</strong><br />
          No processo inicial de construção do pacote de medidas foram 373 instituições brasileiras. Este conjunto inédito de medidas foi levado à análise e adaptações das equipes da TI e da FGV Direito Rio e Direito SP, e contou com contribuições de 192 especialistas, redatores e revisores brasileiros(as), entre gestores(as) públicos(as) dos mais variados órgãos, sociedade civil, academia, integrantes do Judiciário e do Ministério Público, além de advogados(as). Em fevereiro deste ano, as 84 propostas finais foram colocadas em consulta pública através da plataforma colaborativa online Wikilegis, através da qual qualquer pessoa pode conhecer em detalhe cada uma das propostas, apoiar, comentar, criticar e sugerir alterações. Ao final da consulta, em abril, 379 sugestões de emenda de 912 cidadãos cadastrados na plataforma foram acolhidas e avaliadas pela TI e pela FGV Direito Rio e Direito SP. Deste modo, o grupo chegou à formatação final de 70 propostas e que pode ser encontrada em <a href="www.unidoscontraacorrupcao.org.br">www.unidoscontraacorrupcao.org.br</a>.</p>

          <p><strong>Por que o pacote é chamado de "Novas Medidas"? Existe alguma relação com as "10 Medidas Contra a Corrupção"?</strong><br />
          O pacote das “10 Medidas” foi uma importante iniciativa que almejou dar uma resposta sistêmica ao problema da corrupção. Ele teve o mérito de compilar e propor importantes reformas anticorrupção para o país, e coletou mais de dois milhões de assinaturas em seu apoio. Com isso, a campanha das “10 Medidas” chamou a atenção de parcela considerável da população para a necessidade de o país começar a construir respostas sistêmicas à corrupção. No entanto, o pacote também teve problemas e limitações. Algumas propostas foram consideradas por importantes segmentos da sociedade brasileira como excessivas e problemáticas. Houve desacordo e insatisfação com medidas que poderiam ter seu uso perigosamente deturpado (por exemplo, o teste de integridade de funcionários públicos) e outras que limitavam recursos da defesa de réus – atingindo não apenas aqueles de colarinho branco (historicamente impunes), mas também réus de crimes comuns que estão nas parcelas mais vulneráveis da população e cujas garantias básicas são sistematicamente ignoradas. Este foi um dos motivadores para que a TI liderasse este amplo projeto de construção coletiva de propostas, garantindo a participação da sociedade desde sua elaboração, que não somente buscasse atacar as causas estruturais da corrupção e promovesse a integridade no Brasil, mas também que o fizesse da forma mais representativa possível da multiplicidade de visões e interesses da sociedade brasileira.</p>
        
          <p><strong>Como funciona a inclusão das/os candidatas/os na plataforma Unidos Contra a Corrupção?</strong><br />
          O processo de inclusão das/os candidatas/os funciona da seguinte forma. Elas/eles estão sendo convidadas/os a se cadastrar na plataforma online unidoscontraacorrupcao.org.br/compromisso*.Na plataforma, elas/eles poderão:
          <ul>
            <li>Atestar passado limpo;</li>
            <li>Assumir compromisso com a defesa da democracia*;</li>
            <li>Comprometer-se com as Novas Medidas Contra a Corrupção.</li>
          </ul>
          <p>
            (*) A iniciativa Pacto pela Democracia validará os pedidos de adesão das/os candidatas/os. A campanha Unidos contra a Corrupção incorporará no aplicativo as informações repassadas pelo Pacto. Desde 31 de agosto, todas/os as/os postulantes a cargos no Congresso estão automaticamente na plataforma. As/os candidatas/os que não se cadastraram na ferramenta aparecem com o fundo CINZA e os 3 critérios assinalados como “sem resposta”.</p>
          </p>

          <p><strong>O que é o critério de Passado Limpo?</strong><br />
          O critério de passado limpo para a campanha Unidos Contra a Corrupção é rigoroso, exigindo-se além do mínimo legal para todas as candidaturas. A referência são os crimes listados na Lei da Ficha Limpa, mas o limite temporal é descartado (isto é, consideram-se "passado limpo" os/as candidatos/as que nunca tiveram condenação por nenhum daqueles atos). No caso daquelas/es que concorrem à reeleição no Congresso Nacional, as organizações integrantes da coalizão que lidera a campanha verificarão ainda os processos a que essas/es parlamentares respondem no Supremo Tribunal Federal (STF).
          </p>
          
          <p><strong>O que é o critério das Novas Medidas?</strong><br />
          No caso das Novas Medidas contra a Corrupção, a/o candidata/o deverá se comprometer a, caso seja eleita/o, trabalhar já no início de seu mandato a colocar as propostas em tramitação e atuar por sua aprovação. Ressalvas às medidas serão aceitas desde que identificadas e devidamente justificadas.
          </p>

          <p><strong>Como vou saber na plataforma online se meu candidato passou nos critérios da campanha Unidos Contra a Corrupção?</strong><br />
          A depender dos compromissos assumidos com a campanha, as/os candidatas/os serão representadas/os da seguinte forma na plataforma online.
          </p>

          <ul>
            <li>Cor vermelha: Significa que a/o candidata/o aparece com “não” em qualquer um dos três critérios: passado limpo, compromisso com a democracia e adesão às Novas Medidas. Os eleitores poderão pressionar esses candidatos a mudarem de opinião e se comprometerem. No entanto, aquela/e candidata/o que não atestou passado limpo (ele ou ela terão oportunidade de fazê-lo ao se cadastrar) ou, no caso de quem concorre à reeleição, é ré/réu em processo criminal (por ilícitos mencionados pela Lei da Ficha Limpa), não será possível a mudança de status/cor.</li>
            <li>Cor cinza: Significa que a/o candidata/o ainda não se cadastrou na plataforma ou que sua solicitação de adesão está sob análise.</li>
            <li>Cor verde: Significa que a/o candidata/o tem “SIM” para os três critérios da campanha. Mudanças de posição por parte dos candidatos – fruto da pressão dos usuários da plataforma, sociedade civil organizada, imprensa, entre outros – serão consideradas e poderão implicar alteração em seu status. Salvo aqueles que não conseguiram atestar passado limpo, as candidaturas podem passar a figurar como VERDE se optarem por assumir os compromissos com a democracia e com as Novas Medidas.</li>
          </ul>
          
          <p><strong>Haverá algum algoritmo por trás das/os candidatas/os que serão evidenciados aos usuários na plataforma?</strong><br />
          A plataforma online mostrará as fichas dos candidatas/os conforme sua localização (Estado). Sua seleção será aleatória, sem enviesar a visualização ou dar preferência cronológica ou alfabética. Por outro lado, as pessoas poderão filtrar por diferentes informações, como nome, unidade da federação e cargo que disputa.
          </p>

          <p><strong>Como saber se as/os candidatos realmente vão cumprir o prometido?</strong><br />
          Será necessária a iniciativa da/o própria/o candidata/o para evidenciar na plataforma online seu comprometimento público com os critérios da campanha. Funcionará como um contrato que permitirá monitoramento por parte das organizações sociais que lideram a campanha Unidos contra a Corrupção. Também a sociedade poderá contribuir mediante seu papel de fiscalização e cobrança da classe política. Esta não é uma campanha que se encerra com as eleições. As organizações sociais da coalizão que a lidera, ao lado da sociedade, cobrarão todos os candidatos eleitos e que assumiram compromissos com esta pauta.
          </p>

          <p><strong>Como as pessoas poderão interagir? O papel da sociedade se encerra com as eleições?</strong><br />
          Desde 31 de agosto, as/os eleitoras/es podem consultar as candidaturas na plataforma online app.unidoscontraacorrupcao.org.br, verificar seus compromissos assumidos (ou não), compartilhar informações com amigos e familiares e ainda exercer pressão sobre as/os próprias/os candidatas/os para que se comprometam. Depois das eleições, todos os que se cadastraram na plataforma online serão informados por e-mail, redes sociais e site da campanha sobre o passo-a-passo do acompanhamento e cobrança dos candidatos eleitos e que se assumiram compromissos com o encaminhamento de propostas no Congresso Nacional.
          </p>

          <p><strong>Além dos 3 critérios, quais informações adicionais o app trará?</strong><br />
          Haverá um botão “selecionar” no “card” de cada candidata ou candidato. O eleitorado poderá selecionar vários nomes, de modo a obter mais informações sobre eles. Os dados adicionais são: Nome completo, ocupação profissional, total de bens declarados e patrimônio e processos a que ele ou ela respondem. Além disso, haverá a informação sobre o grau de adesão às Novas Medidas, sendo que, em caso de adesão parcial, constará ali a justificativa apresentada. Atenção: o questionário a que a/o candidata/o respondeu no ato de adesão à campanha é a fonte dessa última informação. Já o espaço disponível para justificar adesão parcial, conforme informado no questionário, é de 500 caracteres. Portanto, se a/o candidata/o, ao responder àquele documento, redigiu um texto mais longo, tudo o que exceder 500 caracteres será automaticamente removido.
          </p>
          

        </div>
    </app-header-layout>    
`;
  }

  static get is() {
    return "help-page";
  }
  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      rootPath: String
    };
  }

  _redirectToInbox() {
    this.set("route.path", `/`);
  }
}

window.customElements.define(HelpPage.is, HelpPage);
