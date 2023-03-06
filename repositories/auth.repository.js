
class AuthRepository {
  constructor(Model) {
    this.Model = Model;
  }

  findByEmail = async (email) => {
    const user = await this.Model.findOne({
      where: { email },
    });
    return user;
  }

  createUser = async (email, name, hashed, phone, address, admin, raiting) => {
    const user_data = await this.Model.create({
      email,
      name,
      password: hashed,
      phone,
      address,
      admin,
      raiting,
    })
    return user_data;
  }
}

module.exports = AuthRepository;
