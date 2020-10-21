import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import e from "express";
import { User } from "../../src/Entity/user.entity";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';


const mockCredentialsDto = { username: 'TestUsername', password: 'TestPassword'};

describe('UserRespository' , () => {

    let userRepository;

    beforeEach(async () => {

        const module = await Test.createTestingModule({
            providers:[
                UserRepository
            ]
        }).compile();

        userRepository = await module.get<UserRepository>(UserRepository);

    });

    describe('SignUp' , () => {

        let save;
        beforeEach(async () => {
            save = jest.fn();
            userRepository.create = jest.fn().mockReturnValue({ save });
        });

        it('successfully signs up the user', () => {

            save.mockResolvedValue(undefined);
            expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow();
        });

        it('throws is confilc execption as username already exists ' , () => {
            save.mockRejectedValue({ code: 23505});
            expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow();
        })

        it('throws is confilc execption as username already exists ', () => {
            save.mockRejectedValue({ code: 123456 }); // unhandled error code
            expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
        })

    });

    describe('validateUserPassword' , () => {

        let user;

        beforeEach(() => {

            userRepository.findOne = jest.fn();
            user = new User();
            user.username = 'TestUsername';
            // user.password = 'TestPassword';
            user.passwordsAreEqual = jest.fn();
            bcrypt.compare =  jest.fn();

        });

        it('return the username as validation is successfully' , async () => {

            userRepository.findOne.mockResolvedValue(user);
            user.passwordsAreEqual.mockResolvedValue(true);

            const result = await userRepository.validateUserPassword(mockCredentialsDto);
            expect(result).toEqual(null);

        });

        it('returns null as user cannot be found' , async () => {

            userRepository.findOne.mockResolvedValue(null);
            const result = await userRepository.validateUserPassword(mockCredentialsDto);
            expect(user.passwordsAreEqual).not.toHaveBeenCalled();
            expect(result).toBeNull();

        });

        it('returns null as password is invalid' , async () => {

            userRepository.findOne.mockResolvedValue(user);
            user.passwordsAreEqual.mockResolvedValue(false);

            const result = await userRepository.validateUserPassword(mockCredentialsDto);
            expect(user.passwordsAreEqual).not.toHaveBeenCalled();
            expect(result).toEqual(null);
        })

    });

    describe('hashPassword' , () => {

        it('calls bcrypt.hash to generate a hash' , async () => {

            bcrypt.hash = jest.fn().mockResolvedValue('testHash');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = await userRepository.hashPassword('testPassword' , 'testSalt');
            expect(bcrypt.hash).toHaveBeenCalledWith('testPassword' , 'testSalt');
            expect(result).toEqual('testHash');

        });
    });

});