/// <reference types='cypress' />
import dashboardConfig from '../fixtures/dashboard.json'
import { convertToString } from '../../src/Utils/ConvertUtils'
import {
  ID_PIPELINES,
  ID_IMPORT,
  LABEL_INPUT,
  LABEL_PIPELINE_AREA,
  CLASS_BUTTON_GO,
  TITLE_ORG_NAME,
  TITLE_ACCESS_TOKEN,
  TITLE_PIPELINE,
  TITLE_PIPELINE_REPO,
  ID_ONCALL_LIST,
} from '../fixtures/fixtures'

describe('show pipeline', () => {
  dashboardConfig.token = Cypress.env('BUILDKITE_TOKEN')
  const orgName = dashboardConfig.orgName
  const pipelinesConfig = dashboardConfig.pipelines

  const DASHBOARD_AUTH = {
    ORG: 'org',
    TEAM: 'team',
    SEARCH: 'search',
    TOKEN: 'token',
    ONCALL: 'oncall',
  }

  describe('display pipeline by manuel config', () => {
    beforeEach(() => {
      cy.visit(Cypress.env('url'))
    })

    it('displays buildKite info dialog', () => {
      checkAuthInput()
    })

    it('should can add pipeline, and update pipeline settings', () => {
      cy.contains(TITLE_ACCESS_TOKEN)
        .parent()
        .find('input[type=text]')
        .type(dashboardConfig.token)

      cy.contains(TITLE_ORG_NAME)
        .parent()
        .find('input[type=text]')
        .type(orgName)

      cy.get(ID_PIPELINES).type(pipelinesConfig[0])
      cy.get(ID_ONCALL_LIST).type(convertToString(dashboardConfig.oncall))

      const newConfig = {
        ...dashboardConfig,
        pipelines: [dashboardConfig.pipelines[0]],
      }
      cy.get(CLASS_BUTTON_GO)
        .click()
        .then(() => {
          checkLocalStorageInfo(newConfig)
          checkPipelineTitle(1)
        })
      // should update the pipeline settings

      cy.get('.icon.setting').click()
      checkAuthInfo(newConfig)

      cy.get(ID_PIPELINES).type(`{enter}${pipelinesConfig[1]}`)
      cy.get(CLASS_BUTTON_GO)
        .click()
        .then(() => {
          checkLocalStorageInfo(dashboardConfig)
        })
        .then(() => {
          checkPipelineTitle(2)
          checkPipelineRepo(TITLE_PIPELINE_REPO)
        })
    })

    it('should import auth config json file into app', () => {
      cy.clearLocalStorage()

      cy.get(ID_IMPORT).attachFile('mockedImportAuth.json')

      console.log(dashboardConfig)
      checkAuthInfo(dashboardConfig)

      cy.get(CLASS_BUTTON_GO)
        .click()
        .then(() => {
          checkLocalStorageInfo(dashboardConfig)
        })
    })
    it('should download the latest auth config when click download button', () => {
      cy.clearLocalStorage()

      cy.get(ID_IMPORT).attachFile('mockedImportAuth.json')

      cy.get('#download')
        .click()
        .then(() => {
          setTimeout(() => {
            cy.readFile('cypress/fixtures/downloads/dashboardConfig.json')
              .should('contain', dashboardConfig.token)
              .should('contain', dashboardConfig.orgName)
              .should('contain', dashboardConfig.pipelines[0])
              .should('contain', dashboardConfig.pipelines[1])
          }, 2000)
        })
      cy.get(CLASS_BUTTON_GO).click()
    })

    it('should contain oncall list when click download button', () => {
      cy.clearLocalStorage()

      cy.get(ID_IMPORT).attachFile('mockedImportAuth.json')

      cy.get('#download')
        .click()
        .then(() => {
          setTimeout(() => {
            cy.readFile(
              'cypress/fixtures/downloads/dashboardConfig.json'
            ).should('contain', dashboardConfig.oncall)
          }, 2000)
        })
      cy.get(CLASS_BUTTON_GO).click()
    })
  })

  describe('Config in pipeline', async () => {
    it('should show pipeline given config(token & configPath) in url', async () => {
      await cy.visit(
        `${Cypress.env('url')}?token=${dashboardConfig.token}&config=${
          dashboardConfig.configPath
        }`
      )
      checkPipelineTitle(2)
      checkPipelineRepo(TITLE_PIPELINE_REPO)
    })
  })

  function checkPipelineTitle(countOfPipelines) {
    cy.get(TITLE_PIPELINE).should('have.length', countOfPipelines)
    cy.get(TITLE_PIPELINE).first().should('have.attr', 'href')
    cy.get(TITLE_PIPELINE).first().should('have.attr', 'target', '_blank')
    cy.get(TITLE_PIPELINE).first().should('have.text', pipelinesConfig[0])
  }

  function checkPipelineRepo(repoCssSelector) {
    cy.get(repoCssSelector).should('have.length', 2)
    cy.get(repoCssSelector)
      .first()
      .parent()
      .should('have.attr', 'target', '_blank')
  }

  function checkAuthInput() {
    cy.get(LABEL_INPUT).should('have.length', 4)

    cy.get(LABEL_INPUT).first().should('have.text', '')
    cy.get(LABEL_INPUT).last().should('have.text', '')
    cy.get(ID_PIPELINES).should('have.text', '')
    cy.get(ID_PIPELINES).should('have.text', '')

    cy.get(LABEL_PIPELINE_AREA).should('have.length', 2)
  }

  function checkLocalStorageInfo(dashboardConfig) {
    expect(localStorage.getItem(DASHBOARD_AUTH.ORG)).to.equal(
      dashboardConfig.orgName
    )
    expect(localStorage.getItem(DASHBOARD_AUTH.TEAM)).to.equal(
      dashboardConfig.team
    )
    expect(localStorage.getItem(DASHBOARD_AUTH.SEARCH)).to.equal(
      convertToString(dashboardConfig.pipelines)
    )
    expect(localStorage.getItem(DASHBOARD_AUTH.TOKEN)).to.equal(
      dashboardConfig.token
    )
    expect(localStorage.getItem(DASHBOARD_AUTH.ONCALL)).to.equal(
      convertToString(dashboardConfig.oncall)
    )
  }

  function checkAuthInfo(dashboardConfig) {
    cy.contains(TITLE_ACCESS_TOKEN)
      .parent()
      .find('input[type=text]')
      .should('have.value', dashboardConfig.token)
    cy.contains(TITLE_ORG_NAME)
      .parent()
      .find('input[type=text]')
      .should('have.value', orgName)
    cy.get(ID_PIPELINES).should(
      'have.value',
      dashboardConfig.pipelines.join('\n')
    )
    cy.get(ID_ONCALL_LIST).should(
      'have.value',
      convertToString(dashboardConfig.oncall)
    )
  }
})
