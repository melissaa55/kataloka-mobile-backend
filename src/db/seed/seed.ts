import * as fs from 'fs';
import { exit } from 'process';

import { db } from '../drizzle';
import { quiz } from '../schema';

async function seedQuiz() {
  try {
    // Ask if the user wants to delete the table
    const userInput = await new Promise<string>((resolve) => {
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdout.write('Do you want to delete the quiz table? (yes/no) ');
      process.stdin.on('data', (data) => {
        resolve(data.toString().trim());
      });
    });

    if (userInput.toLowerCase() === 'yes') {
      // Ask user for confirmation
      const confirmInput = await new Promise<string>((resolve) => {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdout.write('\x1b[31mAre you sure? (yes/no) \x1b[0m');
        process.stdin.on('data', (data) => {
          resolve(data.toString().trim());
        });
      });

      if (confirmInput.toLowerCase() === 'yes') {
        console.log('Deleting quiz table...');
        await db.delete(quiz);
        console.log('🗑️ Quiz table deleted!');
      }
    }

    const file = fs.readFileSync('src/db/seed/Seed - Quiz.csv', 'utf8');
    const lines = file.split('\n');
    lines.shift();
    const competitions = lines.map(async (line) => {
      const [question, choice, answer] = line.replace('\r', '').split(';');

      const res = await db
        .insert(quiz)
        .values({
          question,
          answerIdx: parseInt(answer),
          choice: JSON.parse(choice),
        })
        .returning();
      return res;
    });

    // eslint-disable-next-line
    const res = await Promise.all(competitions);

    // console.log(res);
    console.log('✅ Quiz seeding success!');
  } catch (err) {
    console.log(err);
    throw '❌ Error seeding quiz!';
  }
}

async function main() {
  await seedQuiz();
}

if (require.main === module) {
  await main();
  exit();
}
