![alt text](https://github.com/jubar/streamify/blob/main/public/logo-with-colors.png)

**Tune in. Vibe out.** Welcome to the next-generation audio streaming platform that lets you discover, stream, and enjoy music like never before. This app provides seamless access to a massive library of songs, podcasts, and live audio content with a focus on user experience, high-quality sound, and personalized recommendations.

### ⚠️ Disclaimer

This project was built as a demo for an interview process and is not intended for production use. Feel free to copy, extend, or test it.
<br /><br />

## 🛠️ Tech Stack

- Backend: Node.js, NextJS, Prisma and SQLite
- Frontend: TypeScript, React, NextJS, Next UI, ChartJS and TailwindCSS
- Tests: Jest, Testing library and FakerJS
- E2E tests: Playwright

Some facts

- Logo created with AI at [Logo](https://logo.com)
- Sample data generated with AI using [ChatGTP](https://chatgpt.com/)
- Images picked from Spotify CDN

<br /><br />

## 📦 Installation

1.  Clone the repository: git clone https://github.com/jubar/streamify.git
2.  Navigate to the project directory: cd streamify
3.  Install dependencies: npm install

You can now start the server in development mode. Since this is a demo project, and to make execution easier, the `.env` file and a copy of the database are provided. The local database can be found at `/prisma/dev.db`.
<br/><br/>
If you want to re-create the DB you need to execute the following commands:

```bash
$ npx prisma db push --force-reset
```

then in order to populate the DB, execute:

```bash
$ npx prisma db seed
```

> 👆 This command will take 30 seconds, depending on the machine, to complete because it creates 30k records in the database.

<br /><br />

## ⚡️ Start the application in dev mode

Open a terminal and execute the following command:

```bash
$ npm run dev
```

Open a browser with the following URL http://localhost:3000 and you should see something like this:

![alt text](https://github.com/jubar/streamify/blob/main/public/previews/home.png)

<br />

## 🐙 Run tests

To run the tests, open a terminal and run the following command:

```bash
$ npm run test
```

A report of the test status will appear directly in the terminal.

## Run E2E tests

We don’t have a dedicated testing environment or database, so we’ll use the development server. Playwright is configured to automatically start the server if it’s not already running.

To run E2E tests, open a terminal and run the following command:

```bash
$ npx playwright test
```

A report of the test status will appear directly in the terminal.

<br/> 
If you prefer to run the E2E tests in UI mode execute the following command:

```bash
$ npx playwright test --ui
```

and you can see the test player like this:

![alt text](https://github.com/jubar/streamify/blob/main/public/previews/ui-mode-result.png)

<br />

## 📄 License

This project is licensed under the MIT License.
