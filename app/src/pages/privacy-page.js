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
class PrivacyPage extends PolymerElement {
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
        .content {
          padding: 10px 20px;
        }
        h2 {
          margin: 0;
        }
        app-header-layout {
          height: 100vh;
        }
        p {
          font-family: helvetica-neue;
          font-size: 16px;
          color: #333333;
        }
        app-header {
          color: var(--default-primary-color);
          background-color: var(--accent-color);
        }
        div[main-title] {
          margin-left: 10px;
          font-family: Folio;
          font-size: 30px;
          text-transform: uppercase;
        }
        strong {
          color: var(--secondary-text-color);
          font-family: Folio;

        }
    </style>

    <app-header-layout has-scrolling-region>
      <app-header slot="header" condenses reveals fixed effects="waterfall">
        <app-toolbar>
          <paper-icon-button class="header-icon" icon="app:arrow-back" drawer-toggle on-tap="_redirectToInbox"></paper-icon-button>
          <div main-title>Política de privacidade</div>
          <!-- <paper-icon-button class="header-icon" icon="app:search"></paper-icon-button> -->
        </app-toolbar>
      </app-header>
        <div class="content">
          <strong>POLÍTICA DE PRIVACIDADE E TERMOS DE USO TRANSPARÊNCIA INTERNACIONAL BRASIL</strong>
          <p>A ASSOCIAÇÃO TRANSPARÊNCIA E INTEGRIDADE, conhecida como “Transparência Internacional Brasil”, é uma associação brasileira, sem fins lucrativos e de caráter filantrópico, inscrita sob CNPJ no 26.219.946/0001-37 e regulamentada de acordo com o Código Civil Brasileiro (artigos 44 a 69).</p>

          <p>A Transparência Internacional Brasil se compromete com sua privacidade e seu conforto na internet. As informações nessa página tratam [1] dos dados que coletamos em suas visitas a este e os demais sites que gerenciamos; [2] dados pessoais informados por você à Transparência Internacional Brasil; [3] informações coletadas junto a empresas de enriquecimento e locação de dados; [4] e, principalmente, sobre nosso compromisso com sua privacidade e o sigilo dos seus dados.</p>

          <p>Podemos atualizar estes termos sempre que for necessário, considerando, mas não se limitando, a contratação de novos serviços, evolução das tecnologias já utilizadas, mudanças em nossa Política de Doação e a legislação em vigor.</p>

          <p>Ao utilizar esse e os demais sites gerenciados pela Transparência Internacional Brasil, realizar doações financeiras para a Transparência Internacional Brasil, participar de nossas ações de voluntariado ou consumir outros conteúdos gerados pela Transparência Internacional Brasil, você declara estar de acordo com nossos termos de uso e esta política de privacidade.</p>

          <strong>COLETA DE DADOS</strong><br>
          <p>Coletamos dados de acesso e utilização de nossos sites apenas para fins estatísticos. O uso de cookies e pixels de acompanhamento se destinam exclusivamente ao aperfeiçoamento de nossas ações de marketing e captação de recursos. Durante sua visita, não coletamos informações pessoais e dados particulares. Essas informações só são registradas em nossos bancos de dados quando você preenche um formulário e, espontaneamente, as fornece para a Transparência Internacional Brasil.</p>

          <p>Podemos utilizar os serviços de enriquecimento e limpeza de banco de dados de empresas homologadas e com permissão legal para prestar este tipo de serviço. A captura de novas informações se destina exclusivamente à melhora no processo de comunicação entre a Transparência Internacional Brasil e você.</p>

          <p>Da mesma forma, podemos alugar novas listas de fornecedores com autorização para utilizar seus dados – principalmente, mas não apenas, para envio de mala direta e e-mail marketing. Esses dados só ficarão armazenados nos bancos de dados da Transparência Internacional Brasil para que não sejam enviadas comunicações abusivas caso você não responda à primeira mensagem. A responsabilidade pela captura inicial de seus dados é da empresa fornecedora da lista e você poderá solicitar mais informações à Transparência Internacional Brasil a qualquer momento.</p>

          <strong>UTILIZAÇÃO DAS INFORMAÇÕES</strong><br>
          <p>Ao se cadastrar em uma lista da Transparência Internacional Brasil, podemos enviar e-mails, cartas e mensagens de texto (SMS) para fins de mobilização, divulgação e captação de recursos da própria Transparência Internacional Brasil ou de projetos que apoiamos.</p>

          <p>Não enviaremos comunicações que não sejam relacionadas à Transparência Internacional Brasil, ações de combate à corrupção ou mensagens abusivas.</p>

          <p>Todas as informações captadas durante seu acesso aos sites gerenciados pela Transparência Internacional Brasil, em ações de marketing e captação de recursos e eventos serão utilizadas apenas pela Transparência Internacional Brasil. Esses dados não serão, em hipótese alguma, vendidos, alugados ou cedidos a terceiros.</p>

          <strong>ENVIO DE MENSAGENS DE TEXTO (SMS)</strong><br>
          <p>A Transparência Internacional Brasil utiliza os serviços de envio de SMS marketing de empresas especializadas e que respeitam a legislação em vigor. Podemos entrar em contato por telefone ou por mensagem de texto de segunda a sexta-feira, das 09h às 20h e aos sábados, das 10h às 16h, exceto em feriados nacionais.</p>

          <p>Ao se cadastrar em uma ficha de filiação da Transparência Internacional Brasil (https://doe.transparenciainternacional.org.br), você poderá receber uma mensagem de texto de confirmação em seu celular em até 30 minutos, mesmo fora do horário acima estipulado.</p>

          <strong>ACESSO AOS SEUS DADOS</strong><br>
          <p>Você pode solicitar uma cópia dos seus dados a qualquer momento, através do e-mail relacionamento@transparenciainternacional.org.br. No entanto, esses dados precisam ser solicitados por você e não serão entregues a parentes ou assessores/secretários.</p>

          <strong>SEGURANÇA DA INFORMAÇÃO</strong><br>
          <p>Todos os dados em poder da Transparência Internacional Brasil são armazenados em servidores seguros e criptografados, cujo acesso só é permitido a funcionários da Transparência Internacional Brasil capacitados a gerenciá-los com segurança ou fornecedores com contratos de confidencialidade.</p>

          <p>Em todas as páginas em que informações financeiras possam ser transmitidas, um certificado de criptografia de alto nível estará instalado e homologado por uma empresa reconhecida para este fim (Thawte EV SSL CA- G3).</p>

          <strong>EXCLUSÃO DE DADOS</strong><br>
          <p>Você pode solicitar a exclusão do envio de mensagens a qualquer momento, clicando no link “descadastrar endereço” no rodapé de nossos e-mails, respondendo um SMS com a palavra “SAIR” ou entrando em contato com nosso Canal de Relacionamento com Doadores, através do e-mail relacionamento@transparenciainternacional.org.br.</p>

          <strong>REDES SOCIAIS</strong><br>
          <p>A Transparência Internacional Brasil está presente na seguinte rede social:</p>

          <p>Facebook (https://www.facebook.com/<br>
          transparenciainternacional)</p>

          <p>Acreditamos a liberdade de expressão que faz parte do processo para construirmos uma sociedade cada vez mais aberta e igual para todos. Por isso, não excluiremos comentários postados em redes sociais sobre os posicionamentos e ações da Transparência Internacional Brasil.</p>

          <p>Apenas mensagens abusivas, de cunho comercial, com conteúdo impróprio, palavras de baixo calão, com ataques pessoais ou a grupos específicos serão excluídas e o usuário poderá ser banido de nossas páginas.</p>

          <p>SITES GERENCIADOS PELA TRANSPARÊNCIA INTERNACIONAL BRASIL<br>
          Abaixo, a lista de sites gerenciados pela Transparência Internacional Brasil e representados por esta Política de Privacidade:</p>

          <p>transparenciainternacional.org.br;<br>
          doe.transparenciainternacional.org.br;<br>
          novasmedidas.transparenciainternacional.org.br;<br>
          transparenciainternacional.com.br;<br>
          transparenciacorporativa.org.br;<br>
          trac.transparenciainternacional.org.br;<br>
          cmal.transparenciainternacional.org.br;<br>
          quemmoraaolado.org.br;<br>
          unidoscontraacorrupcao.org.br<br>
          </p>
          <strong>GERAL</strong><br>
          <p>Política de Privacidade atualizada em 25/05/2018.</p>

          <p>www.transparenciainternacional.org.br/politica-de-privacidade</p>
        </div>
    </app-header-layout>    
`;
  }

  static get is() {
    return "privacy-page";
  }
  static get properties() {
    return {
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String
    };
  }

  _redirectToInbox() {
    this.set("route.path", `/`);
  }
}

window.customElements.define(PrivacyPage.is, PrivacyPage);
