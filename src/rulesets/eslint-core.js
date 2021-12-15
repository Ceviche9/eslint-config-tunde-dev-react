const restrictedGlobals = require('confusing-browser-globals');
const { rules: allPrettierRules } = require('eslint-config-prettier');

const prettierRules = Object.fromEntries(
  Object.entries(allPrettierRules).filter(([key]) => !key.includes('/'))
);

/**
 * @param {{
 *  typescript: {
 *    hasTypeScript: boolean;
 *  };
 *  react: {
 *    isNext: boolean;
 *    isCreateReactApp: boolean;
 *  };
 *  rules?: Record<string, string | [string, string | object];
 * }} options
 */
const createEslintCoreRules = ({
  typescript,
  react,
  rules: customRules = {},
}) => ({
  ...getPossibleErrorRules({ typescript }),
  ...getBestPractices({ typescript }),
  ...strictModeRules,
  ...getVariableRules({ typescript }),
  ...getStylisticIssuesRules({ typescript, react }),
  ...getES6Rules({ typescript }),
  ...prettierRules,
  ...safePrettierOverrides,
  ...customRules,
});


const getPossibleErrorRules = ({ typescript: { hasTypeScript } }) => ({

  'for-direction': 'error',

  'getter-return': hasTypeScript ? 'off' : 'warn',

  'no-async-promise-executor': 'error',

  'no-await-in-loop': 'error',

  'no-compare-neg-zero': 'error',

  'no-cond-assign': ['warn', 'except-parens'],

  'no-console': 'warn',

  'no-constant-condition': 'error',

  'no-control-regex': 'warn',

  'no-debugger': 'warn',

  'no-dupe-args': hasTypeScript ? 'off' : 'error',

  'no-dupe-else-if': 'warn',

  'no-dupe-keys': hasTypeScript ? 'off' : 'warn',

  'no-duplicate-case': 'warn',

  'no-empty': 'warn',

  'no-empty-character-class': 'warn',

  'no-ex-assign': 'warn',

  'no-extra-boolean-cast': 'warn',

  'no-extra-parens': 'off',

  'no-extra-semi': 'off',

  'no-func-assign': hasTypeScript ? 'off' : 'warn',

  'no-import-assign': hasTypeScript ? 'off' : 'error',

  'no-inner-declarations': 'warn',

  'no-invalid-regexp': 'error',

  'no-irregular-whitespace': 'warn',

  'no-loss-of-precision': hasTypeScript ? 'off' : 'error',

  'no-misleading-character-class': 'warn',

  'no-obj-calls': hasTypeScript ? 'off' : 'error',

  'no-promise-executor-return': 'error',

  'no-prototype-builtins': 'error',

  'no-regex-spaces': 'warn',

  'no-setter-return': hasTypeScript ? 'off' : 'error',

  'no-sparse-arrays': 'warn',

  'no-template-curly-in-string': 'warn',

  'no-unexpected-multiline': 'warn',

  'no-unreachable': hasTypeScript ? 'off' : 'warn',

  'no-unreachable-loop': 'off',

  'no-unsafe-finally': 'error',

  'no-unsafe-negation': hasTypeScript ? 'off' : 'warn',

  'no-useless-backreference': 'warn',

  'require-atomic-updates': 'warn',

  semi: 'off',

  'space-before-function-paren': 'off',

  'valid-typeof': hasTypeScript ? 'off' : 'warn',
});

const getBestPractices = ({ typescript: { hasTypeScript } }) => ({
  'accessor-pairs': 'off',

  'array-callback-return': hasTypeScript
    ? 'off'
    : [
        'error',
        {
          checkForEach: true,
        },
      ],

  'block-scoped-var': 'off',

  'class-methods-use-this': 'off',

  complexity: 'off',

  'consistent-return': 'off',

  curly: ['warn', 'all'],

  'default-case': hasTypeScript ? 'off' : 'error',

  'default-case-last': 'error',

  'default-param-last': hasTypeScript ? 'off' : 'error',

  'dot-location': 'off',

  'dot-notation': hasTypeScript ? 'off' : 'warn',

  /**
   * prevents unsafe comparison
   *
   * @see https://eslint.org/docs/rules/eqeqeq
   */
  eqeqeq: 'warn',

  'grouped-accessor-pairs': 'off',

  'guard-for-in': 'warn',

  'max-classes-per-file': 'off',

  'no-alert': 'warn',

  'no-caller': 'error',

  'no-case-declarations': 'warn',

  'no-constructor-return': hasTypeScript ? 'off' : 'error',

  'no-div-regex': 'warn',

  'no-else-return': 'warn',

  'no-empty-function': hasTypeScript ? 'off' : 'error',

  'no-empty-pattern': 'warn',

  'no-eq-null': 'error',

  'no-eval': 'error',

  'no-extend-native': 'error',

  /**
   * prevents unecessary function binding
   *
   * @see https://eslint.org/docs/rules/no-extra-bind
   */
  'no-extra-bind': 'warn',

  /**
   * disallows unecessary labels
   *
   * off because labels are forbidden
   *
   * @see https://eslint.org/docs/rules/no-extra-label
   * @see no-label
   */
  'no-extra-label': 'off',

  /**
   * disallows case fallthrough
   *
   * @see https://eslint.org/docs/rules/no-fallthrough
   */
  'no-fallthrough': 'warn',

  /**
   * disallows floating decimals
   *
   * @see https://eslint.org/docs/rules/no-floating-decimal
   */
  'no-floating-decimal': 'warn',

  /**
   * disallows overwriting globals
   *
   * @see https://eslint.org/docs/rules/no-global-assign
   */
  'no-global-assign': 'warn',

  /**
   * disallows coercion for anything but booleans
   *
   * @see https://eslint.org/docs/rules/no-implicit-coercion
   */
  'no-implicit-coercion': [
    'warn',
    {
      boolean: false,
      number: true,
      string: true,
    },
  ],

  /**
   * disallows implicit globals for clarity
   *
   * @see https://eslint.org/docs/rules/no-implicit-globals
   */
  'no-implicit-globals': 'error',

  /**
   * disallows implied eval
   *
   * @see https://eslint.org/docs/rules/no-implied-eval
   */
  'no-implied-eval': 'error',

  /**
   * disallows this outside of classes/class-like objects
   *
   * @see https://eslint.org/docs/rules/no-invalid-this
   */
  'no-invalid-this': hasTypeScript ? 'off' : 'error',

  /**
   * disallows __iterator__ property
   *
   * off because legacy
   *
   * @see https://eslint.org/docs/rules/no-iterator
   */
  'no-iterator': 'off',

  /**
   * disallows labels
   *
   * @see https://eslint.org/docs/rules/no-labels
   */
  'no-labels': 'error',

  /**
   * disallows standalone code blocks
   *
   * off because valid in es6
   *
   * @see https://eslint.org/docs/rules/no-lone-blocks
   */
  'no-lone-blocks': 'off',

  /**
   * disallow function creation in loops
   *
   * @see https://eslint.org/docs/rules/no-loop-func
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
   */
  'no-loop-func': hasTypeScript ? 'off' : 'error',

  /**
   * always off because it expects literally every number to be assigned to
   * a variable before
   *
   * @see https://eslint.org/docs/rules/no-magic-numbers
   * @see @typescript-eslint/no-magic-numbers
   */
  'no-magic-numbers': 'off',

  /**
   * off because prettier takes care of that
   *
   * @see https://eslint.org/docs/rules/no-multi-spaces
   */
  'no-multi-spaces': 'off',

  /**
   * disallow multiline strings; use template literals instead.
   *
   * off because of misleading error message.
   *
   * @see https://eslint.org/docs/rules/no-multi-str
   */
  'no-multi-str': 'off',

  /**
   * disallow new for side effects
   *
   * @see https://eslint.org/docs/rules/no-new
   */
  'no-new': 'error',

  /**
   * disallows implicit eval
   *
   * @see https://eslint.org/docs/rules/no-new-func
   */
  'no-new-func': 'error',

  /**
   * disallows primitive wrapper instances such as `new String('foo')`
   *
   * @see https://eslint.org/docs/rules/no-new-wrappers
   */
  'no-new-wrappers': 'error',

  /**
   * disallows legacy escape sequences
   *
   * @see https://eslint.org/docs/rules/no-nonoctal-decimal-escape
   */
  'no-nonoctal-decimal-escape': 'error',

  /**
   * disallows octals
   *
   * @see https://eslint.org/docs/rules/no-octal
   */
  'no-octal': 'warn',

  /**
   * disallow octal escapse; deprecated
   *
   * @see https://eslint.org/docs/rules/no-octal-escape
   */
  'no-octal-escape': 'error',

  /**
   * disallows param mutation. copy locally instead.
   *
   * @see https://eslint.org/docs/rules/no-param-reassign
   */
  'no-param-reassign': 'error',

  /**
   * disallows usage of `__proto__`
   *
   * @see https://eslint.org/docs/rules/no-proto
   */
  'no-proto': 'error',

  /**
   * disallows reassigning a variable
   *
   * @see https://eslint.org/docs/rules/no-redeclare
   * @see ts(2451)
   */
  'no-redeclare': hasTypeScript ? 'off' : 'error',

  /**
   * off because indivudal
   *
   * @see https://eslint.org/docs/rules/no-restricted-properties
   */
  'no-restricted-properties': 'off',

  /**
   * disallows assignments in return
   *
   * @see https://eslint.org/docs/rules/no-return-assign
   */
  'no-return-assign': 'error',

  /**
   * @see https://eslint.org/docs/rules/no-return-await
   * @see @typescript-eslint/no-return-await
   */
  'no-return-await': hasTypeScript ? 'off' : 'error',

  /**
   * disallow inline javascript in urls
   *
   * @see https://eslint.org/docs/rules/no-script-url
   */
  'no-script-url': 'error',

  /**
   * disallow self assignments
   *
   * @see https://eslint.org/docs/rules/no-self-assign
   */
  'no-self-assign': 'error',

  /**
   * disallow comparing a variable against itself
   *
   * @see https://eslint.org/docs/rules/no-self-compare
   */
  'no-self-compare': 'error',

  /**
   * disallows use of comma as operator
   *
   * @see https://eslint.org/docs/rules/no-sequences
   */
  'no-sequences': 'error',

  /**
   * disallows throwing anything but errors
   *
   * off because handled by @typescript-eslint/no-throw-literal
   *
   * @see https://eslint.org/docs/rules/no-throw-literal
   * @see @typescript-eslint/no-throw-literal
   */
  'no-throw-literal': hasTypeScript ? 'off' : 'error',

  /**
   * disallow infinite loops
   *
   * @see https://eslint.org/docs/rules/no-unmodified-loop-condition
   */
  'no-unmodified-loop-condition': 'error',

  /**
   * disallows unsafe optional chaining
   *
   * @see https://github.com/eslint/eslint/blob/master/docs/rules/no-unsafe-optional-chaining.md
   */
  'no-unsafe-optional-chaining': hasTypeScript ? 'off' : 'error',

  /**
   * @see https://eslint.org/docs/rules/no-unused-expression
   * @see @typescript-eslint/no-unused-expression
   */
  'no-unused-expressions': hasTypeScript
    ? 'off'
    : [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],

  /**
   * removes unused labels
   *
   * off because labels are forbidden
   *
   * @see https://eslint.org/docs/rules/no-unused-labels
   * @see no-label
   */
  'no-unused-labels': 'off',

  /**
   * @see https://github.com/eslint/eslint/blob/main/docs/rules/no-unused-private-class-members.md
   */
  'no-unused-private-class-members': hasTypeScript ? 'off' : 'warn',

  /**
   * call functions directly
   *
   * @see https://eslint.org/docs/rules/no-useless-call
   */
  'no-useless-call': 'error',

  /**
   * disallows useless catch
   *
   * off because already handled by @sonarjs/no-useless-catch
   *
   * @see https://eslint.org/docs/rules/no-useless-catch
   * @see sonarjs/no-useless-catch
   */
  'no-useless-catch': 'off',

  /**
   * disallows string concat, just write it as string
   *
   * @see https://eslint.org/docs/rules/no-useless-concat
   */
  'no-useless-concat': 'error',

  /**
   * disallows needlessly escaping
   *
   * @see https://eslint.org/docs/rules/no-useless-escape
   */
  'no-useless-escape': 'warn',

  /**
   * disallows useless return
   *
   * @see https://eslint.org/docs/rules/no-useless-return
   */
  'no-useless-return': 'warn',

  /**
   * prevents use of void operator
   *
   * @see https://eslint.org/docs/rules/no-void
   */
  'no-void': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/no-warning-comments
   */
  'no-warning-comments': 'off',

  /**
   * disallows `with`, forbidden in strict mode anyways
   *
   * @see https://eslint.org/docs/rules/no-with
   */
  'no-with': 'error',

  /**
   * prefer named capture groups in regexp
   *
   * off because it leads to a lot of additional code. case per case basis.
   *
   * @see https://eslint.org/docs/rules/prefer-named-capture-group
   */
  'prefer-named-capture-group': 'off',

  /**
   * prefer rejecting with errors
   *
   * @see https://eslint.org/docs/rules/prefer-promise-reject-errors
   */
  'prefer-promise-reject-errors': 'error',

  /**
   * disallow regexp constructor with strings as argument
   *
   * use it inline
   *
   * @see https://eslint.org/docs/rules/prefer-regex-literals
   */
  'prefer-regex-literals': 'error',

  /**
   * off because irrelevant in an es5+ world
   *
   * @see https://eslint.org/docs/rules/radix
   */
  radix: 'off',

  /**
   * prevents using `async` without `await`
   *
   * @see https://eslint.org/docs/rules/require-await
   * @see @typescript-eslint/require-await
   */
  'require-await': hasTypeScript ? 'off' : 'error',

  /**
   * enforces u flag on regexp. mostly here for the 2nd reason: find errors early
   *
   * @see https://eslint.org/docs/rules/require-unicode-regexp
   */
  'require-unicode-regexp': 'error',

  /**
   * off because nonsensical
   *
   * @see https://eslint.org/docs/rules/vars-on-top
   */
  'vars-on-top': 'off',

  /**
   * expects iifes to be wrapped
   *
   * @see https://eslint.org/docs/rules/wrap-iife
   */
  'wrap-iife': 'warn',

  /**
   * disallows reversing a comparison
   *
   * @see https://eslint.org/docs/rules/yoda
   */
  yoda: 'warn',
});

const strictModeRules = {
  /**
   * enables/disables strict mode
   *
   * without effect since index declares parserOptions.sourceType to module
   *
   * @see https://eslint.org/docs/rules/strict
   */
  strict: 'off',
};

/**
 * @see https://eslint.org/docs/rules/#variables
 */
const getVariableRules = ({ typescript: { hasTypeScript } }) => ({
  /**
   * off because required to escape scope
   *
   * @see https://eslint.org/docs/rules/init-declarations
   */
  'init-declarations': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/no-delete-var
   */
  'no-delete-var': 'off',

  /**
   * disallows labels that are variable names
   *
   * off because labels are disallowed
   *
   * @see https://eslint.org/docs/rules/no-label-var
   * @see no-label
   */
  'no-label-var': 'off',

  /**
   * disallows usage of specific globals
   *
   * @see https://eslint.org/docs/rules/no-restricted-globals
   */
  'no-restricted-globals': ['error', ...restrictedGlobals],

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/no-shadow
   */
  'no-shadow': 'off',

  /**
   * disallows shadowing restricted names
   *
   * @see https://eslint.org/docs/rules/no-shadow-restricted-names
   */
  'no-shadow-restricted-names': 'error',

  /**
   * disallow using undefined variables
   *
   * @see https://eslint.org/docs/rules/no-undef
   * @see ts(2304)
   */
  'no-undef': hasTypeScript ? 'off' : 'error',

  /**
   * disallows declaring new variables with `undefined` as explicit value
   *
   * @see https://eslint.org/docs/rules/no-undef-init
   */
  'no-undef-init': 'warn',

  /**
   * off because already taken care of by no-shadow-restricted-names
   *
   * @see https://eslint.org/docs/rules/no-undefined
   * @see no-shadow-restricted-names
   */
  'no-undefined': 'off',

  /**
   * @see https://eslint.org/docs/rules/no-unused-vars
   * @see @typescript-eslint/no-unused-vars
   */
  'no-unused-vars': hasTypeScript
    ? 'off'
    : [
        'warn',
        {
          args: 'none',
          ignoreRestSiblings: true,
        },
      ],

  /**
   * @see https://eslint.org/docs/rules/no-use-before-define
   * @see @typescript-eslint/no-use-before-define
   */
  'no-use-before-define': hasTypeScript
    ? 'off'
    : [
        'warn',
        {
          classes: false,
          functions: false,
          variables: false,
        },
      ],
});

/**
 * @see https://eslint.org/docs/rules/#stylistic-issues
 */
const getStylisticIssuesRules = ({
  typescript: { hasTypeScript, config },
  react: { isCreateReactApp, isNext },
}) => ({
  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/array-bracket-newline
   */
  'array-bracket-newline': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/array-bracket-spacing
   */
  'array-bracket-spacing': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/array-element-newline
   */
  'array-element-newline': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/block-spacing
   */
  'block-spacing': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/brace-style
   */
  'brace-style': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/camelcase
   */
  camelcase: 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/capitalized-comments
   */
  'capitalized-comments': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/comma-dangle
   */
  'comma-dangle': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/comma-spacing
   */
  'comma-spacing': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/comma-style
   */
  'comma-style': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/computed-property-spacing
   */
  'computed-property-spacing': 'off',

  /**
   * off because opinionated, partially outdated and individual
   *
   * @see https://eslint.org/docs/rules/consistent-this
   */
  'consistent-this': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/eol-last
   */
  'eol-last': 'off',

  /**
   * disallows `fn ()`, prefers `fn()`
   *
   * off because prettier takes care of that
   *
   * @see https://eslint.org/docs/rules/func-call-spacing
   * @see @typescript-eslint/func-call-spacing.md
   */
  'func-call-spacing': 'off',

  /**
   * off because arbitrary
   *
   * @see https://eslint.org/docs/rules/func-name-matching
   */
  'func-name-matching': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/func-names
   */
  'func-names': ['warn', 'as-needed'],

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/func-style
   */
  'func-style': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/function-call-argument-newline
   */
  'function-call-argument-newline': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/function-paren-newline
   */
  'function-paren-newline': 'off',

  /**
   * off because opinonated
   *
   * @see https://eslint.org/docs/rules/id-denylist
   */
  'id-denylist': 'off',

  /**
   * off because too specific
   *
   * @see https://eslint.org/docs/rules/id-length
   */
  'id-length': 'off',

  /**
   * off because too specific
   *
   * @see https://eslint.org/docs/rules/id-match
   */
  'id-match': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/implicit-arrow-linebreak
   */
  'implicit-arrow-linebreak': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/indent
   */
  indent: 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/jsx-quotes
   */
  'jsx-quotes': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/key-spacing
   */
  'key-spacing': 'off',

  /**
   * off because prettier takes care of that
   *
   * @see https://eslint.org/docs/rules/keyword-spacing
   * @see @typescript-eslint/keyword-spacing
   */
  'keyword-spacing': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/line-comment-position
   */
  'line-comment-position': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/linebreak-style
   */
  'linebreak-style': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/lines-around-comment
   */
  'lines-around-comment': 'off',

  /**
   * ensures proper spacing between class members
   *
   * @see https://eslint.org/docs/rules/lines-between-class-members
   * @see @typescript-eslint/lines-between-class-members
   */
  'lines-between-class-members': hasTypeScript ? 'off' : 'warn',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/max-depth
   */
  'max-depth': 'off',

  /**
   * off because taken care of by prettier
   *
   * @see https://eslint.org/docs/rules/max-len
   */
  'max-len': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/max-lines
   */
  'max-lines': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/max-lines-per-function
   */
  'max-lines-per-function': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/max-nested-callbacks
   */
  'max-nested-callbacks': 'off',

  /**
   * off because technically nice, although individual
   *
   * @see https://eslint.org/docs/rules/max-params
   */
  'max-params': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/max-statements
   */
  'max-statements': 'off',

  /**
   * off because handled by prettier to some degree
   *
   * @see https://eslint.org/docs/rules/max-statements-per-line
   */
  'max-statements-per-line': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/multiline-comment-style
   */
  'multiline-comment-style': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/multiline-ternary
   */
  'multiline-ternary': 'off',

  /**
   * expects instance creations to begin with a capital letter
   *
   * @see https://eslint.org/docs/rules/new-cap
   */
  'new-cap':
    config &&
    config.compilerOptions &&
    config.compilerOptions.experimentalDecorators
      ? 'off'
      : 'warn',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/new-parens
   */
  'new-parens': 'off',

  /**
   * off because handled by prettier
   *
   * @see https://eslint.org/docs/rules/newline-per-chained-call
   */
  'newline-per-chained-call': 'off',

  /**
   * @see https://eslint.org/docs/rules/no-array-constructor
   * @see @typescript-eslint/no-array-constructor
   * @see unicorn/no-new-array
   */
  'no-array-constructor': hasTypeScript ? 'off' : 'error',

  /**
   * prevents accidental uses of bitwise operators
   *
   * @see https://eslint.org/docs/rules/no-bitwise
   */
  'no-bitwise': 'warn',

  /**
   * off because opinionated although rarely used anyways
   *
   * @see https://eslint.org/docs/rules/no-continue
   */
  'no-continue': 'off',

  /**
   * off because opinionated
   *
   * @see https://eslint.org/docs/rules/no-inline-comments
   */
  'no-inline-comments': 'off',

  /**
   * prefer `else if` over `else { if (condition )}`
   *
   * @see https://eslint.org/docs/rules/no-lonely-if
   * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-lonely-if.md
   */
  'no-lonely-if': 'off',

  /**
   * @see https://eslint.org/docs/rules/no-mixed-operators
   */
  'no-mixed-operators': [
    'warn',
    {
      allowSamePrecedence: false,
      groups: [
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof'],
      ],
    },
  ],

  'no-mixed-spaces-and-tabs': 'off',

  'no-multi-assign': 'error',

  'no-multiple-empty-lines': 'warn',

  'no-new-object': 'error',

  'no-plusplus': 'off',

  'no-restricted-syntax': 'off',

  'no-tabs': 'off',

  'no-ternary': 'off',

  'no-trailing-spaces': 'off',

  'no-underscore-dangle': 'off',

  'no-unneeded-ternary': 'warn',

  'no-whitespace-before-property': 'off',

  'nonblock-statement-body-position': 'off',

  'object-curly-newline': 'off',

  'object-curly-spacing': 'off',

  'object-property-newline': 'off',

  'one-var': ['warn', 'never'],

  'one-var-declaration-per-line': 'off',

  'operator-assignment': ['warn', 'always'],

  'operator-linebreak': 'off',

  'padded-blocks': 'off',

  'padding-line-between-statements': 'off',

  'prefer-exponentiation-operator': 'warn',

  'prefer-object-spread': 'warn',

  'quote-props': 'off',

  quotes: 'off',

  semi: 'off',

  'semi-spacing': 'off',

  'semi-style': 'off',

  'sort-keys': 'off',

  'sort-vars': 'off',

  'space-before-blocks': 'off',

  'space-before-function-paren': 'on',

  'space-in-parens': 'on',

  'space-infix-ops': 'off',

  'space-unary-ops': 'off',

  'spaced-comment': [
    'warn',
    'always',

    hasTypeScript && (isCreateReactApp || isNext) ? { markers: ['/'] } : {},
  ],

  'switch-colon-spacing': 'off',

  'template-tag-spacing': 'off',

  'unicode-bom': 'off',

  'use-isnan': 'off',

  'wrap-regex': 'off',
});

const getES6Rules = ({ typescript: { hasTypeScript } }) => ({
  'arrow-body-style': 'off',

  'arrow-parens': 'off',

  'arrow-spacing': 'off',

  'constructor-super': hasTypeScript ? 'off' : 'error',

  'generator-star-spacing': 'off',

  'no-class-assign': 'error',

  'no-confusing-arrow': 'off',

  'no-const-assign': hasTypeScript ? 'off' : 'error',

  'no-dupe-class-members': hasTypeScript ? 'off' : 'error',

  'no-duplicate-imports': 'off',

  'no-new-symbol': 'off',

  'no-restricted-exports': 'off',

  'no-restricted-imports': 'off',

  'no-this-before-super': hasTypeScript ? 'off' : 'error',

  'no-useless-computed-key': 'warn',

  'no-useless-constructor': hasTypeScript ? 'off' : 'warn',

  'no-useless-rename': 'warn',

  'no-var': 'error',

  'object-shorthand': 'warn',

  'prefer-const': hasTypeScript ? 'error' : 'warn',

  'prefer-destructuring': 'warn',

  'prefer-numeric-literals': 'warn',

  'prefer-rest-params': 'error',

  'prefer-spread': 'error',

  'prefer-template': 'warn',

  'require-yield': 'error',

  'rest-spread-spacing': 'off',

  'sort-imports': 'off',

  'symbol-description': 'error',

  'template-curly-spacing': 'off',

  'yield-star-spacing': 'off',
});

const safePrettierOverrides = {
  curly: getBestPractices({ typescript: { hasTypeScript: false } }).curly,

  'prefer-arrow-callback': 'warn',
};

module.exports = {
  createEslintCoreRules,
  getBestPractices,
  getES6Rules,
  getPossibleErrorRules,
  getStylisticIssuesRules,
  getVariableRules,
  prettierRules,
  restrictedGlobals,
  safePrettierOverrides,
  strictModeRules,
};
