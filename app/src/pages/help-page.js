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
        p {
          color: black;
        }
        app-header {
          color: black;
        }
        .content {
          padding: 10px 20px;
        }
        h2 {
          margin: 0;
        }
    </style>
    
    <app-header-layout has-scrolling-region>
      <app-header slot="header" condenses reveals fixed effects="waterfall">
        <app-toolbar>
          <paper-icon-button class="header-icon" icon="app:close" drawer-toggle on-tap="_redirectToInbox"></paper-icon-button>
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
