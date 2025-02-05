import { Request, Response } from 'express';
import { IUser } from '../../model/modelUser/modelUser';
import { prisma } from '../../prisma';
import { hash } from 'bcryptjs';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password }: IUser = req.body;

      const userExists = await prisma.user.findUnique({
        where: { email }
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      return res.status(400).json({ error: 'Error creating user' });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          password: false
        }
      });

      return res.json(users);
    } catch (error) {
      return res.status(400).json({ error: 'Error fetching users' });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          password: false
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Error fetching user' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email, password }: IUser = req.body;

      const userExists = await prisma.user.findUnique({
        where: { id }
      });

      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }

      let data: any = {};
      
      if (name) data.name = name;
      if (email) data.email = email;
      if (password) data.password = await hash(password, 10);

      const user = await prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          password: false
        }
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Error updating user' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const userExists = await prisma.user.findUnique({
        where: { id }
      });

      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }

      await prisma.user.delete({
        where: { id }
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Error deleting user' });
    }
  }
}
