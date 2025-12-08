'use client'

import {
  InteractiveJson,
  HighlightRule,
  TooltipRule,
  CollapsibleConfig,
} from '@/components/InteractiveJson'

// Step 1: Basic structure - just linkId, text, type
const step1Data = {
  linkId: 'sbr-grade',
  text: 'Grade SBR',
  type: 'group',
  item: [
    {
      linkId: 'sbr-grade-total',
      text: 'Grade total',
      type: 'integer',
    },
    {
      linkId: 'sbr-differentiation',
      text: 'Différenciation',
      type: 'integer',
    },
    {
      linkId: 'sbr-pleomorphism',
      text: 'Pléomorphisme',
      type: 'integer',
    },
    {
      linkId: 'sbr-mitoses',
      text: 'Mitoses',
      type: 'integer',
    },
  ],
}

// Step 2: Add variables and calculated expression
const step2Data = {
  linkId: 'sbr-grade',
  text: 'Grade SBR',
  type: 'group',
  extension: [
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'differentiation',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-differentiation').answer.value",
      },
    },
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'pleomorphism',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-pleomorphism').answer.value",
      },
    },
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'mitoses',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-mitoses').answer.value",
      },
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'sbrGradeTotal',
        language: 'text/fhirpath',
        expression: '%differentiation + %pleomorphism + %mitoses',
      },
    },
  ],
  item: [
    {
      linkId: 'sbr-grade-total',
      text: 'Grade total',
      type: 'integer',
      extension: [
        {
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
          valueExpression: {
            language: 'text/fhirpath',
            expression: '%sbrGradeTotal',
          },
        },
      ],
    },
    {
      linkId: 'sbr-differentiation',
      text: 'Différenciation',
      type: 'integer',
    },
    {
      linkId: 'sbr-pleomorphism',
      text: 'Pléomorphisme',
      type: 'integer',
    },
    {
      linkId: 'sbr-mitoses',
      text: 'Mitoses',
      type: 'integer',
    },
  ],
}

// Step 3: Add narrative template snippet
const step3Data = {
  linkId: 'sbr-grade',
  text: 'Grade SBR',
  type: 'group',
  extension: [
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'differentiation',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-differentiation').answer.value",
      },
    },
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'pleomorphism',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-pleomorphism').answer.value",
      },
    },
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'mitoses',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-mitoses').answer.value",
      },
    },
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'sbrGradeTotal',
        language: 'text/fhirpath',
        expression: '%differentiation + %pleomorphism + %mitoses',
      },
    },
    {
      url: 'http://fhir.tiro.health/StructureDefinition/narrative-template-snippet',
      valueExpression: {
        language: 'text/liquid',
        expression:
          'Le grade de SBR modifié par Ellis et Ellston peut être évalué à {{sbrGradeTotal}} (différenciation = {{differentiation}}, pléomorphisme = {{pleomorphism}}, mitoses = {{mitoses}}).',
      },
    },
  ],
  item: [
    {
      linkId: 'sbr-grade-total',
      text: 'Grade total',
      type: 'integer',
      extension: [
        {
          __collapsed: true,
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
          valueExpression: {
            language: 'text/fhirpath',
            expression: '%differentiation + %pleomorphism + %mitoses',
          },
        },
      ],
    },
    {
      linkId: 'sbr-differentiation',
      text: 'Différenciation',
      type: 'integer',
    },
    {
      linkId: 'sbr-pleomorphism',
      text: 'Pléomorphisme',
      type: 'integer',
    },
    {
      linkId: 'sbr-mitoses',
      text: 'Mitoses',
      type: 'integer',
    },
  ],
}

// Step 4: Add itemControl extension (final version)
const step4Data = {
  linkId: 'sbr-grade',
  text: 'Grade SBR',
  type: 'group',
  extension: [
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'differentiation',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-differentiation').answer.value",
      },
    },
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'pleomorphism',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-pleomorphism').answer.value",
      },
    },
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'mitoses',
        language: 'text/fhirpath',
        expression: "%item.where(linkId = 'sbr-mitoses').answer.value",
      },
    },
    {
      __collapsed: true,
      url: 'http://hl7.org/fhir/StructureDefinition/variable',
      valueExpression: {
        name: 'sbrGradeTotal',
        language: 'text/fhirpath',
        expression: '%differentiation + %pleomorphism + %mitoses',
      },
    },
    {
      __collapsed: true,
      url: 'http://fhir.tiro.health/StructureDefinition/narrative-template-snippet',
      valueExpression: {
        language: 'text/liquid',
        expression:
          'Le grade de SBR modifié par Ellis et Ellston peut être évalué à {{sbrGradeTotal}} (différenciation = {{differentiation}}, pléomorphisme = {{pleomorphism}}, mitoses = {{mitoses}}).',
      },
    },
  ],
  item: [
    {
      linkId: 'sbr-grade-total',
      text: 'Grade total',
      type: 'integer',
      extension: [
        {
          __collapsed: true,
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
          valueExpression: {
            language: 'text/fhirpath',
            expression: '%differentiation + %pleomorphism + %mitoses',
          },
        },
      ],
    },
    {
      linkId: 'sbr-differentiation',
      text: 'Différenciation',
      type: 'integer',
      extension: [
        {
          __collapsed: true,
          url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://hl7.org/fhir/questionnaire-item-control',
                code: 'drop-down',
                display: 'Drop down',
              },
            ],
          },
        },
      ],
      answerOption: [
        { valueInteger: 1 },
        { valueInteger: 2 },
        { valueInteger: 3 },
      ],
    },
    {
      linkId: 'sbr-pleomorphism',
      text: 'Pléomorphisme',
      type: 'integer',
      extension: [
        {
          __collapsed: true,
          url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://hl7.org/fhir/questionnaire-item-control',
                code: 'drop-down',
                display: 'Drop down',
              },
            ],
          },
        },
      ],
      answerOption: [
        { valueInteger: 1 },
        { valueInteger: 2 },
        { valueInteger: 3 },
      ],
    },
    {
      linkId: 'sbr-mitoses',
      text: 'Mitoses',
      type: 'integer',
      extension: [
        {
          __collapsed: true,
          url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://hl7.org/fhir/questionnaire-item-control',
                code: 'drop-down',
                display: 'Drop down',
              },
            ],
          },
        },
      ],
      answerOption: [
        { valueInteger: 1 },
        { valueInteger: 2 },
        { valueInteger: 3 },
      ],
    },
  ],
}

// Highlights and tooltips
const basicHighlights: HighlightRule[] = [
  { path: /\.linkId$/, className: 'text-blue-400 font-semibold' },
  { path: /\.type$/, className: 'text-purple-400' },
]

const step2Highlights: HighlightRule[] = [
  { path: /\.linkId$/, className: 'text-blue-400 font-semibold' },
  { path: /\.type$/, className: 'text-purple-400' },
  {
    path: /extension\[\d+\]\.url$/,
    valuePattern: /(variable|sdc-questionnaire-calculatedExpression)$/,
    className: 'text-green-300 font-semibold',
  },
]

const step3Highlights: HighlightRule[] = [
  { path: /\.linkId$/, className: 'text-blue-400 font-semibold' },
  { path: /\.type$/, className: 'text-purple-400' },
  {
    path: /extension\[\d+\]\.url$/,
    valuePattern:
      /(variable|sdc-questionnaire-calculatedExpression|narrative-template-snippet)$/,
    className: 'text-green-300 font-semibold',
  },
  {
    path: /\.expression$/,
    valuePattern: /\{\{[^}]+\}\}/,
    className: 'text-amber-400 font-semibold',
  },
]

const step4Highlights: HighlightRule[] = [
  { path: /\.linkId$/, className: 'text-blue-400 font-semibold' },
  { path: /\.type$/, className: 'text-purple-400' },
  {
    path: /extension\[\d+\]\.url$/,
    valuePattern:
      /(variable|sdc-questionnaire-calculatedExpression|narrative-template-snippet|questionnaire-itemControl)$/,
    className: 'text-green-300 font-semibold',
  },
  {
    path: /\.expression$/,
    valuePattern: /\{\{[^}]+\}\}/,
    className: 'text-amber-400 font-semibold',
  },
  {
    path: /\.code$/,
    valuePattern: /drop-down/,
    className: 'text-cyan-400 font-semibold',
  },
]

const tooltips: TooltipRule[] = [
  {
    path: /\.linkId$/,
    title: 'linkId',
    content:
      'Unique identifier for this item. Used to map responses back to questions.',
  },
  {
    path: /\.type$/,
    title: 'type',
    content:
      'Data type: "group" for containers, "integer" for numbers, "string" for text.',
  },
  {
    path: /\.text$/,
    title: 'text',
    content: 'Human-readable label displayed to users.',
  },
  {
    path: /\.item$/,
    title: 'item',
    content: 'Nested questions within this group.',
  },
  {
    path: /\.extension$/,
    title: 'extension',
    content: 'FHIR extensions add custom functionality beyond the base spec.',
  },
  {
    path: /\.name$/,
    title: 'name',
    content: 'Variable name, referenced as %variableName in expressions.',
  },
  {
    path: /\.expression$/,
    title: 'expression',
    content: 'FHIRPath or template expression.',
  },
]

// Item arrays are collapsible via external config (defaultOpen: true)
// Extension objects use inline __collapsed: true for per-object control
const collapsible: CollapsibleConfig = [{ path: /\.?item$/, defaultOpen: true }]

const collapsibleOpen: CollapsibleConfig = [
  { path: /\.?item$/, defaultOpen: true },
]

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
        Tiro.health Data Model
      </p>
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        From Template to Structured Data
      </h1>
      <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
        This guide walks through how Tiro.health transforms a pathology report
        template into a fully structured, computable FHIR Questionnaire. We will
        build up the data model step by step.
      </p>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        The data model follows the{' '}
        <a
          href="https://hl7.org/fhir/questionnaire.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          FHIR R5 Questionnaire
        </a>{' '}
        and{' '}
        <a
          href="https://hl7.org/fhir/questionnaireresponse.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          QuestionnaireResponse
        </a>{' '}
        standards. For advanced functionality like calculated expressions and
        variables, we use the{' '}
        <a
          href="https://hl7.org/fhir/uv/sdc/2025Jan/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          FHIR SDC Implementation Guide
        </a>
        . Tiro.health also defines{' '}
        <a
          href="https://fhir.tiro.health/artifacts.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          custom extensions and code systems
        </a>{' '}
        for additional functionality like narrative template generation.
      </p>

      {/* Source Template */}
      <section className="mb-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
          The Source: A Report Template
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Pathologists work with templates containing placeholders that get
          filled in during reporting. Here is a typical SBR grading snippet:
        </p>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm dark:border-amber-800 dark:bg-amber-950/30">
          <p className="font-serif leading-relaxed text-gray-800 dark:text-gray-200">
            Le grade de SBR modifié par Ellis et Ellston peut être évalué à{' '}
            <span className="rounded bg-yellow-200 px-1 dark:bg-yellow-700">
              !
            </span>{' '}
            (différenciation ={' '}
            <span className="rounded bg-yellow-200 px-1 dark:bg-yellow-700">
              !
            </span>
            , pléomorphisme ={' '}
            <span className="rounded bg-yellow-200 px-1 dark:bg-yellow-700">
              !
            </span>
            , mitoses ={' '}
            <span className="rounded bg-yellow-200 px-1 dark:bg-yellow-700">
              !
            </span>
            ).
          </p>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The highlighted{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">!</code>{' '}
          placeholders are fields to be filled in. The total grade is calculated
          as the sum of three component scores.
        </p>
      </section>

      {/* Full Questionnaire Context */}
      <section className="mb-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
          The Complete Report Structure
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          The SBR grade fragment we are building is part of a larger breast
          cancer pathology report. Here is the full hierarchy - we will focus on
          the highlighted section:
        </p>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-700 dark:bg-gray-800/50">
          <div className="space-y-1 text-gray-600 dark:text-gray-400">
            <p>1. Specimen information</p>
            <p className="pl-4 text-gray-400 dark:text-gray-500">
              1.1 Nature of specimen, 1.2 Laterality/location
            </p>
            <p>2. Clinical information</p>
            <p className="pl-4 text-gray-400 dark:text-gray-500">
              2.1 Clinical indication
            </p>
            <p>3. Histopathological examination</p>
            <p className="pl-4 text-gray-400 dark:text-gray-500">
              3.1 Macroscopic description (weight, fragments)
            </p>
            <p className="pl-4">3.2 Microscopic findings</p>
            <p className="pl-8 text-gray-400 dark:text-gray-500">
              3.2.1 Invasive carcinoma (differentiation grade)
            </p>
            <p className="pl-8 text-gray-400 dark:text-gray-500">
              3.2.2 In situ component - DCIS (nuclear grade, pattern, necrosis,
              microcalcifications)
            </p>
            <p className="rounded bg-blue-100 pl-8 font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              3.2.3 SBR grade (total score, tubule formation, nuclear
              pleomorphism, mitotic count)
            </p>
            <p className="pl-8 text-gray-400 dark:text-gray-500">
              3.2.4 Tumour extent (fragments, size)
            </p>
            <p className="pl-4 text-gray-400 dark:text-gray-500">
              3.3 Immunohistochemistry (ER, PR, HER2, Ki67)
            </p>
            <p>4. Conclusion</p>
            <p className="pl-4 text-gray-400 dark:text-gray-500">
              4.1-4.8 Summary findings (laterality, grade, receptor status)
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Each section follows the same patterns we will explore below. The SBR
          grade is a good example because it combines data capture, automatic
          calculation, and narrative generation.
        </p>
      </section>

      {/* Step 1: Basic Structure */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-300 text-sm font-medium text-blue-600 dark:border-blue-700 dark:text-blue-400">
            1
          </span>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Structure
          </h2>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          We start by defining the data structure using FHIR Questionnaire. Each
          field gets a unique{' '}
          <code className="rounded bg-gray-100 px-1 text-blue-600 dark:bg-gray-800 dark:text-blue-400">
            linkId
          </code>
          , a display{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
            text
          </code>
          , and a{' '}
          <code className="rounded bg-gray-100 px-1 text-purple-600 dark:bg-gray-800 dark:text-purple-400">
            type
          </code>{' '}
          that defines the expected input.
        </p>
        <InteractiveJson
          data={step1Data}
          highlights={basicHighlights}
          tooltips={tooltips}
          collapsible={collapsibleOpen}
        />
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Key concepts:</strong> The{' '}
            <code className="text-blue-500">linkId</code> uniquely identifies
            each field for data binding. The <code>group</code> type creates a
            container for related fields. This structure captures what data
            exists, but not how it is computed or displayed.
          </p>
        </div>
      </section>

      {/* Step 2: Variables & Calculations */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-300 text-sm font-medium text-blue-600 dark:border-blue-700 dark:text-blue-400">
            2
          </span>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Variables & Calculated Fields
          </h2>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Next, we add computation logic. The{' '}
          <code className="rounded bg-gray-100 px-1 text-green-600 dark:bg-gray-800 dark:text-green-400">
            variable
          </code>{' '}
          extension extracts values from answers, and{' '}
          <code className="rounded bg-gray-100 px-1 text-green-600 dark:bg-gray-800 dark:text-green-400">
            calculatedExpression
          </code>{' '}
          auto-computes the total grade. Users never need to manually add the
          scores.
        </p>
        <InteractiveJson
          data={step2Data}
          highlights={step2Highlights}
          tooltips={tooltips}
          collapsible={collapsible}
        />
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Key concepts:</strong> Variables use FHIRPath expressions to
            extract and reference values. The{' '}
            <code className="text-green-500">%variableName</code> syntax lets
            you reference variables in other expressions. The total is
            automatically recalculated when component scores change.
          </p>
        </div>
      </section>

      {/* Step 3: Narrative Template */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-300 text-sm font-medium text-blue-600 dark:border-blue-700 dark:text-blue-400">
            3
          </span>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Narrative Template
          </h2>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Now we add the ability to generate human-readable report text. The{' '}
          <code className="rounded bg-gray-100 px-1 text-green-600 dark:bg-gray-800 dark:text-green-400">
            narrative-template-snippet
          </code>{' '}
          extension contains a template with{' '}
          <code className="rounded bg-gray-100 px-1 text-amber-600 dark:bg-gray-800 dark:text-amber-400">
            {'{{variable}}'}
          </code>{' '}
          placeholders that get replaced with actual values.
        </p>
        <InteractiveJson
          data={step3Data}
          highlights={step3Highlights}
          tooltips={tooltips}
          collapsible={collapsible}
        />
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Key concepts:</strong> The template uses Liquid-style{' '}
            <code className="text-amber-500">{'{{variableName}}'}</code> syntax.
            Structured data becomes readable narrative automatically. This is
            the same template the pathologist originally worked with - now
            powered by structured data.
          </p>
        </div>
      </section>

      {/* Step 4: UI Controls */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-300 text-sm font-medium text-blue-600 dark:border-blue-700 dark:text-blue-400">
            4
          </span>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            UI Controls & Answer Options
          </h2>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Finally, we add UI hints and predefined answer options. The{' '}
          <code className="rounded bg-gray-100 px-1 text-green-600 dark:bg-gray-800 dark:text-green-400">
            questionnaire-itemControl
          </code>{' '}
          extension specifies that fields should render as{' '}
          <code className="rounded bg-gray-100 px-1 text-cyan-600 dark:bg-gray-800 dark:text-cyan-400">
            drop-down
          </code>{' '}
          selects, and <code>answerOption</code> provides the valid choices.
        </p>
        <InteractiveJson
          data={step4Data}
          highlights={step4Highlights}
          tooltips={tooltips}
          collapsible={collapsible}
        />
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Key concepts:</strong> UI rendering is separated from data
            structure. The same questionnaire could render as dropdowns, radio
            buttons, or sliders depending on the context. Answer options ensure
            data quality by constraining valid inputs.
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/30">
        <h2 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
          Summary: Single Source of Truth
        </h2>
        <p className="text-blue-800 dark:text-blue-200">
          This FHIR Questionnaire now contains everything needed to capture,
          compute, validate, and display the SBR grade. The structured data can
          be exported to downstream systems, while the narrative template
          ensures the pathologist sees familiar report text. Changes to the data
          model automatically flow through to calculations and narrative
          generation.
        </p>
      </section>
    </div>
  )
}
