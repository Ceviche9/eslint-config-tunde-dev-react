const createRocketseatRules = ({ typescript, rules: customRules = {} }) => ({
  ...getRocketseatRules({ typescript }),
  ...customRules,
});


const getRocketseatRules = ({ typescript: { hasTypeScript } }) => ({
  
  "camelcase": "off",
  "import/no-duplicates": "off",
  "react/jsx-props-no-spreading": "off",
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
  "jsx-a11y/anchor-is-valid": [
    "error",
    {
      "components": [
        "Link"
      ],
      "specialLink": [
        "hrefLeft",
        "hrefRight"
      ],
      "aspects": [
        "invalidHref",
        "preferButton"
      ]
    }
  ],
  "react/jsx-one-expression-per-line": "off",
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",
  "react/require-default-props": "off",
  "react/jsx-filename-extension": [
    1,
    {
      "extensions": [
        ".tsx"
      ]
    }
  ],
  "import/prefer-default-export": "off",
  "@typescript-eslint/explicit-function-return-type": [
    "warn",
    {
      "allowExpressions": true
    }
  ],
  "@typescript-eslint/camelcase": "off"
}
)

module.exports = {
  createRocketseatRules,
  getRocketseatRules
}