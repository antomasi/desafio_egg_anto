import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";
import { IsNotEmpty } from "class-validator";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['dni'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nombre: string;

    @Column()
    @IsNotEmpty()
    apellido: string;
    
    @Column({nullable: true})
    role: string;

    @Column()
    @IsNotEmpty()
    password: string;
    
    @Column()
    @IsNotEmpty()
    dni: number;

    hashPassword():void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password:string):Boolean{
        return bcrypt.compareSync(password, this.password);
    }
}

