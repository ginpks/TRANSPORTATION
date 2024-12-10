import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feedbackDatabase = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../source/feedback.sqlite'),
    logging: console.log,
});

const Feedback = feedbackDatabase.define('Feedback', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

feedbackDatabase.sync({ force: false }).then(() => {
    console.log('Feedback database synchronized');
}).catch(error => console.error('Error synchronizing feedback database:', error));

export { feedbackDatabase, Feedback };
