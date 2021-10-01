import Moralis from "moralis/types";

export interface UserModel extends Moralis.User<Moralis.Attributes> {
  createdAt: Date;
}
