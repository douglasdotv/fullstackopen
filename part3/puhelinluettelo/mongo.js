const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [<name> <number>]')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://douglas:${password}@cluster0.edr1s.mongodb.net/puhelinluetteloDb?retryWrites=true&w=majority&appName=puhelinluetteloApp`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Phonebook: ')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`Added ${name}, number ${number}, to the phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Usage: node mongo.js <password> [<name> <number>]')
  mongoose.connection.close()
}
