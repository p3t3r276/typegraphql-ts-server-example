import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExists";
import { PasswordMixin } from "../../shared/PasswordInput";
import { OkMixin } from "../../shared/OkMixin";

@InputType()
export class RegisterInput extends OkMixin(PasswordMixin(class {})) {
  @Field()
  @Length(1, 30)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use." })
  email: string;
}
