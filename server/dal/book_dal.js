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

    async getCategories() {
        try {
            return await this.bookModel.find({});
        } catch (error) {
            console.error("getCategories:", error.message);
            return {};
        }
    }

    async getCategory(id) {
        try {
            return await this.bookModel.findById(id);
        } catch (error) {
            console.error("getCategory:", error.message);
            return {};
        }
    }

    async createCategory(newCategory) {
        let category = new this.bookModel(newCategory);
        return category.save();
    }

  /*   async addAnswer(bookId, answer) {
        const book = await this.getBook(bookId);
        book.books.push({title: answer});
        return book.save();
    } */

   /*  async upvoteAnswer(questionId, answerId) {
        const question = await this.getQuestion(questionId);
        const answer = question.answers.id(answerId);
        answer.votes++;
        return question.save();
    } */

    async bootstrap(count = 1) {
        let l = (await this.getCategories()).length;
        console.log("Book collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let category = new this.bookModel({
                    category: 'JavaScript',
                    books: [ 
                        {
                        title: "How to JS Part 1",
                        author: "Kayle",
                        price: 30,
                        name: "Alex",
                        email: "alex@gmail.com"
                    },
                        {
                            title: "How to JS Part 2",
                            author: "Kayleson",
                            price: 45,
                            name: "Peter",
                            email: "Peter@gmail.com"
                        },
                    ],
                    
                });
                let category1 = new this.bookModel({
                    category: 'C#',
                    books: [ {
                        title: "Don't do it",
                        author: "Simon",
                        price: 99,
                        name: "Jesper",
                        email: "jesper@gmail.com"
                    },
                        {
                            title: "C# the hard way",
                            author: "Jike",
                            price: 150,
                            name: "James",
                            email: "james@gmail.com"
                        },
                    ]
                });
                
                promises.push(category.save());
                promises.push(category1.save());
            }

            return Promise.all(promises);
        }
    }
}

module.exports = (mongoose) => new BookDAL(mongoose);