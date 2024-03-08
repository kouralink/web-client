import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword,User,signOut } from 'firebase/auth'
import { auth } from '@/services/firebase';
import { FirebaseError } from 'firebase/app';



// interface 
interface AuthState{
    user:User|null;
    loading:boolean;
    error:string|null;
}

// inisial state
const initialState:AuthState = {
    user:auth.currentUser,
    loading:false,
    error:null
};

// create slice
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<User|null>)=>{
            state.user = action.payload
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading = action.payload
        },
        setError:(state,action:PayloadAction<string|null>)=>{
            state.error = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(
            register.pending,
            (state)=>{
                console.log('pen')
                state.loading = true
            }
        )
        .addCase(
            register.fulfilled,
            (state, action) => {
                state.loading = false;
                state.error = null;
                console.log('fullfilled')
                if (typeof action.payload === 'object' && action.payload !== null) {
                    state.user = action.payload as User;
                } else {
                    state.error = action.payload as string;
                }
            }
        ).addCase(
            register.rejected,
            (state, action) => {
                console.log('rej')
                state.loading = false;
                state.error = action.error.message as string;
            }
        );
        builder.addCase(
            logout.pending,
            (state)=>{
                state.loading = true
            }
        ).addCase(
            logout.fulfilled,
            (state, action) => {
                state.loading = false;
                state.error = null;
                if (action.payload == null) {
                    state.user = null;
                } else {
                    state.error = action.payload as string;
                    alert(state.error)
                }
            }
        ).addCase(
            logout.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
                alert(state.error)
            }
        )
    }
});

export const register = createAsyncThunk(
    'auth/register',
    async ({email, password}: {email: string, password: string})=> {
        try{
            await createUserWithEmailAndPassword(auth,email,password)
            return auth.currentUser
        }catch(error){
            if(error instanceof FirebaseError){
                if(error.code === 'auth/email-already-in-use'){
                    return 'Email already in use'
                }else if(error.code === 'auth/invalid-email'){
                    return 'Invalid email'
                }else if(error.code === 'auth/weak-password'){
                    return 'Weak password'
                }else if(error.code === 'auth/operation-not-allowed'){
                    return 'Operation not allowed'}
                return error.message
            }else{
                return 'An error occurred'
            }
        }
    }
)

export const logout = createAsyncThunk(
    'auth/lougout',
    async ()=> {
        try{
            await signOut(auth)
            return null
        }catch(error){
            if(error instanceof FirebaseError){
                return error.message 
            }else{
                return 'An error occurred'}
        }
    }
)

export const {setUser,setLoading,setError} = authSlice.actions;

export default authSlice.reducer;