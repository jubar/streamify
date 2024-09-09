![alt text](https://github.com/jubar/streamify/blob/main/public/logo-with-colors.png)

**Tune in. Vibe out.** Welcome to the next-generation audio streaming platform that lets you discover, stream, and enjoy music like never before. This app provides seamless access to a massive library of songs, podcasts, and live audio content with a focus on user experience, high-quality sound, and personalized recommendations.

### ⚠️ Disclaimer

This project was built as a demo for an interview process and is not intended for production use. Feel free to copy, extend, or test it.
<br /><br />

## 🛠️ Tech Stack

- Backend: Node.js, NextJS, Prisma and SQLite
- Frontend: TypeScript, React, NextJS, Next UI, ChartJS and TailwindCSS
- Test: Jest, Testing library and FakerJS
- Deployment: Vercel platform

Some facts

- Logo created with AI at [Logo](https://logo.com)
- Sample data generated with AI using [ChatGTP](https://chatgpt.com/)
- Images picked from Spotify CDN

<br /><br />

## 📦 Installation

1.  Clone the repository: git clone https://github.com/jubar/streamify.git
2.  Navigate to the project directory: cd streamify
3.  Install dependencies: npm install

Create an .env file in the root directory with the DB path

```bash
 DATABASE_URL="file:./dev.db"
```

Create the DB in the specific path

```bash
$ npx prisma db push
```

Populate the DB with sample data

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

Open a browser with the following URL http://localhost:3000

<br /><br />

## Run tests

In order to run the test, open a terminal and run the following command:

```bash
$ npm run test
```

A report of the test status will appear directly in the terminal.

<br /><br />
##📄 License

This project is licensed under the MIT License.
