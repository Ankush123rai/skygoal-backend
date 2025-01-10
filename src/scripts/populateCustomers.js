const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Customer = require('../models/Customer.model');

const BATCH_SIZE = 5000; 
const TOTAL_RECORDS = 2000000;

async function generateCustomers() {
  try {
    await mongoose.connect('mongodb+srv://umakantbhendarkar94:Td8yUB87QW14FgSn@authenticcluster.iyo66pk.mongodb.net/Authentic', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 20, 
    });
    console.log('Connected to MongoDB');

    let processedCount = 0;

    const generateBatch = (start, end) => {
      return Array.from({ length: end - start + 1 }, (_, index) => ({
        s_no: start + index,
        name_of_customer: faker.person.fullName(),
        email: faker.internet.email(),
        mobile_number: faker.phone.number(),
        dob: faker.date.past({ years: 50 }),
      }));
    };

    for (let i = 1; i <= TOTAL_RECORDS; i += BATCH_SIZE) {
      const end = Math.min(i + BATCH_SIZE - 1, TOTAL_RECORDS);
      const batch = generateBatch(i, end);

      await Customer.bulkWrite(
        batch.map((customer) => ({
          insertOne: { document: customer },
        }))
      );

      processedCount += batch.length;
      if (processedCount % (BATCH_SIZE * 10) === 0 || processedCount === TOTAL_RECORDS) {
        console.log(`Processed ${processedCount} records`);
      }
    }

    console.log('Data generation completed');
    process.exit(0);
  } catch (error) {
    console.error('Error generating data:', error);
    process.exit(1);
  }
}

generateCustomers();
