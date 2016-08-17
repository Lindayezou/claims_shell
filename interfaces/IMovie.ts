interface IMovie {
  _id: any;
  title: String;
  director: String;
  year: Number;
  rating: String;
  imageUrl: String;
  owner: String|IUser;
}
