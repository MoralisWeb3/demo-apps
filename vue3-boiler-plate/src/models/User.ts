import Moralis from "../moralis";

export interface UserModel extends Moralis.User<Moralis.Attributes> {
  createdAt: Date;
}
