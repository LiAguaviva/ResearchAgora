import bcrypt from 'bcrypt';

export const hashPassword = async (password) =>{
    try {
        const hashedPassword = await bcrypt.hash(password, 10)        
        return hashedPassword
    } catch (error) {
        throw error
    }
}

export const comparePassword = async (password, hash) =>{
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (error) {
        throw error
    }
}