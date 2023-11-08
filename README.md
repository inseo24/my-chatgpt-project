## ChatGPT API를 써보자

### 준비

- Node.js
- npm or yarn

### 설치


1. Clone the repository:

```bash
git clone git@github.com:inseo24/my-chatgpt-project.git
cd my-chatgpt-project
```

2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

3. Add OpenAI API Key to .env.local file

```
OPENAI_API_KEY=your-api-key-here
```

4. Run the App

```
next dev
```

or

```
npm run dev
```

or 

```
yarn dev
```

5. Page : [http://localhost:3000](http://localhost:3000) 

<img width="853" alt="image" src="https://github.com/inseo24/my-chatgpt-project/assets/84627144/f6dc376b-24a2-4a99-9e16-8327600dd7b3">


6. Changing the ChatGPT Model

`/api/chat/route/ts` 

```javascript
const payload = {
  messages,
  model: 'gpt-4-1106-preview', // Change this to the model you want to use
  stream: false,
};
```
- [OpenAI Models page](https://platform.openai.com/docs/models/models)
