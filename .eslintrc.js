module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Prevent legacy booking type imports
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/**/*',
            from: './src/types/booking*.ts',
            message: 'Use @/lib/booking instead of legacy booking types (see MIGRATION.md)'
          }
        ]
      }
    ]
  },
};