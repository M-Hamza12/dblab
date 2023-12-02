import { Iadmin } from '../Interface/interface';
import { addModel, fetchModel, updateModel } from './genericRepo';
export class adminRepo {
  static async addAdmin(admin: Iadmin) {
    try {
      await addModel(
        `insert into admin(id,name,email,password,role) values(${admin.id},'${admin.name}','${admin.email}','${admin.password}','admin')`
      );
    } catch (error) {
      throw error;
    }
  }
  static async fetchAdminById(id: number) {
    try {
      const admin = await fetchModel<Iadmin[]>(
        'Select * from admin where id = ' + id
      );
      return admin[0];
    } catch (error) {
      throw error;
    }
  }
  static async fetchAdminByEmail(email: string) {
    try {
      const admin = await fetchModel<Iadmin[]>(
        `Select * from admin where email =  '${email}'`
      );
      return admin[0];
    } catch (error) {
      throw error;
    }
  }
  static async loggedIn(id: number, token: string) {
    try {
      await updateModel(`update admin set token = ${token} where id = ${id}`);
    } catch (error) {
      throw error;
    }
  }
}
