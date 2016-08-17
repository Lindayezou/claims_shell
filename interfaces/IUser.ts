interface IUser {
  _id: any;
  username: String;
  salt: String;
  password: String;
  role: String;
  movies: Array<String|IMovie>
}
