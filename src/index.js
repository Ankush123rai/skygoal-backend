const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Customer = require('./models/Customer.model');
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/customers', async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', filterField, filterValue } = req.query;

        const query = {};

        if (search) {
            query.$or = [
                { name_of_customer: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { mobile_number: { $regex: search, $options: 'i' } },
            ];

            const searchDate = new Date(search);
            if (!isNaN(searchDate.getTime())) {
                query.$or.push({ dob: searchDate });
            }
        }

        if (filterField && filterValue) {
            query[filterField] = { $regex: filterValue, $options: 'i' };
        }

        const sort = {};
        if (filterField) {
            sort[filterField] = 1; 
        }

        const customers = await Customer.find(query)
            .sort(sort)
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit))
            .exec();

        const total = await Customer.countDocuments(query);

        res.json({ customers, total });
    } catch (error) {
        console.error('Error fetching customers:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
