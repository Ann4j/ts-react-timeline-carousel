import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

import jsLint from '@eslint/js'
import tsLint from 'typescript-eslint'

/** @type {import('@eslint/compat/dist/esm').FlatConfig[]} */
export default [
  includeIgnoreFile(gitignorePath),
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsLint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]
