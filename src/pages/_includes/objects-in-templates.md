<InlineAlert variant="info" slots="text"/>

Templates must not instantiate new objects within their code. All objects must be passed from the Block object.
This way, the template remains stateless and its sole responsibility is to display the data it receives from the Block object.
This approach promotes a clear separation of concerns, improves testability, and makes the code more modular and easier to maintain.
It also ensures that the template does not have unexpected side effects, as it is not responsible for creating objects or managing their lifecycle.
