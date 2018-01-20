function kebabToSnake(sent) {
  newSent = sent.replace(/-/g, "_");
  console.log(newSent);
}
kebabToSnake("hello-world");
kebabToSnake("dogs-are-awesome");
kebabToSnake("blah");
