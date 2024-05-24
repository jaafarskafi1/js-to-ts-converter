# js-to-ts-converter

A tool to automatically convert JavaScript code to TypeScript using large language models (e.g., OpenAI's GPT-3).

## Features

- Convert JavaScript code to TypeScript
- Leverages OpenAI's GPT-3 for accurate conversion
- Command-Line Interface (CLI) for easy use
- Automatically handles common TypeScript conversions and annotations

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/jaafarskafi1/js-to-ts-converter.git
   cd js-to-ts-converter
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up OpenAI API key:
   - Sign up for the OpenAI API and get your API key.
   - Create a `.env` file in the root directory and add your API key:
     ```sh
     OPENAI_API_KEY=your_openai_api_key_here
     ```

## Usage

1. Run the converter:

   ```sh
   node src/index.js convert path/to/your/javascript-file.js
   ```

2. The converted TypeScript file will be created in the same directory with a `.ts` extension.

## Example

Convert a simple JavaScript file:

```sh
node src/index.js convert example.js
```
