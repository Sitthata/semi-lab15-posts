import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import { faker } from '@faker-js/faker';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedDatabase() {
    // Seed Users
    const users = [];
    for (let i = 0; i < 5; i++) {
        const user = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            dob: faker.date.past(30),
        };
        const userDoc = await db.collection("users").add(user);
        users.push({ id: userDoc.id, ...user });
    }

    // Seed Posts
    for (let i = 0; i < 10; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const post = {
            user: randomUser.id,
            postdate: faker.date.recent(),
            body: faker.lorem.paragraph(),
        };
        const postDoc = await db.collection("posts").add(post);

        // Seed Comments Subcollection
        for (let j = 0; j < 3; j++) {
            const comment = {
                name: faker.name.firstName(),
                email: faker.internet.email(),
                cmtdate: faker.date.recent(),
                comment: faker.lorem.sentence(),
                stars: Math.floor(Math.random() * 6), // Random stars between 0 and 5
            };
            await postDoc.collection("comments").add(comment);
        }
    }

    console.log("Seeding completed!");
}

seedDatabase().catch(console.error);