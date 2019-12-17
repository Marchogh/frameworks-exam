class BookDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const bookSchema = new mongoose.Schema({
            category: String,
            books: [
                {
                    title: String,
                    author: String,
                    price: Number,
                    name: String,
                    email: String
                }
            ]
        });
        this.bookModel = mongoose.model('book', bookSchema);
    }

    async getBooks() {
        try {
            return await this.bookModel.find({});
        } catch (error) {
            console.error("getBook:", error.message);
            return {};
        }
    }

    async getBook(id) {
        try {
            return await this.bookModel.findById(id);
        } catch (error) {
            console.error("getBook:", error.message);
            return {};
        }
    }

    async createBook(newBook) {
        let book = new this.bookModel(newBook);
        return book.save();
    }

    async addAnswer(bookId, answer) {
        const book = await this.getBook(bookId);
        book.books.push({title: answer});
        return book.save();
    }

   /*  async upvoteAnswer(questionId, answerId) {
        const question = await this.getQuestion(questionId);
        const answer = question.answers.id(answerId);
        answer.votes++;
        return question.save();
    } */

    async bootstrap(count = 10) {
        let l = (await this.getBooks()).length;
        console.log("Book collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let book = new this.bookModel({
                    category: 'JavaScript Category',
                    books: [
                        { title: "How to JS Part 1" },
                        { author: "Kayle" },
                        { price: 30 },
                        { name: "Alex" },
                        { email: "alex@gmail.com" }
                    ]
                });
                promises.push(book.save());
            }

            return Promise.all(promises);
        }
    }
}

module.exports = (mongoose) => new BookDAL(mongoose);