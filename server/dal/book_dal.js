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

    // Gets all categories
    async getCategories() {
        try {
            return await this.bookModel.find({});
        } catch (error) {
            console.error("getCategories:", error.message);
            return {};
        }
    }

    // Gets the category by id
    async getCategory(id) {
        try {
            return await this.bookModel.findById(id);
        } catch (error) {
            console.error("getCategory:", error.message);
            return {};
        }
    }

    // Creates a new category
    async createCategory(newCategory) {
        let category = new this.bookModel(newCategory);
        try {
            return category.save();
        } catch (error) {
            console.error("getCategory:", error.message);
            return {};
        }
    }

    // Creates a new book
    async createBook(id, book) {
        const category = await this.getCategory(id);
        category.books.push(book);
        try {
            return category.save();
        } catch (error) {
            console.error("postBook:", error.message);
            return {};
        }
    }

    // Test data 
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