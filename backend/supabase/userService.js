import supabase from './supabaseClient.js';

export async function readUsers() {
    // const { data, error } = await supabase 
    // .from('users')
    // .select('*');
    const { error } = await supabase
  .from('users')
  .insert({ username: 'Italy', password: 'password123', email: 'italy@world.com' })
    if (error) {
        console.error('Error fetching users:', error.message);
        }
    return data;
}

// console.log(readUsers());
const users = await readUsers();
console.log(users);