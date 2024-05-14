import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FormData = {
    email: string;
    password: string;
};


const SignIn = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",

        }
    })

    const submitData: SubmitHandler<FormData> = async (data) => {
        const payload = {
            email: data.email,
            password: data.password,
        }

        await axios.post(`http://localhost:4000/auth/login`, payload).then((res) => {
            if (res?.status === 200) {
                // toast(`Login sucessfully 😇`)
                toast.success('Login sucessfully 😇');
                setTimeout(() => {
                    navigate('/home')
                }, 1500);
            } else {
                console.log("31", res)

                toast.error('Incorrect username or password. Please try again.')
            }
        }).catch((err) => {
            toast.error(err?.response?.data?.error?.error)
        })
    }
    return (
        <div className='w-full'>
            <ToastContainer limit={1} autoClose={1000} />
            <section className="text-gray-600 body-font relative ">
                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 mx-auto">
                        <p className="text-gray-900 text-3xl mb-1 font-medium title-font mx-auto">Login</p>

                        <form>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register('email', { required: 'Email is required.' })}
                                />
                                {errors.email && (
                                    <span className='text-red-600 text-danger'>
                                        {errors.email?.message?.toString()}
                                    </span>
                                )}
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Password</label>
                                <input type="password" id="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register('password', { required: 'Password is required.' })}
                                />
                                {errors.password && (
                                    <span className='text-red-600 text-danger'>
                                        {errors.password?.message?.toString()}
                                    </span>
                                )}
                            </div>
                        </form>
                        <Link className='text-end mb-2 text-blue-600 text-xs' to={'/forgot-password'}>Forgot password ?</Link>

                        <button
                            className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                            onClick={handleSubmit(submitData)}
                        >Login
                        </button>
                        <p
                            className="mt-3"
                        >
                            Not a register?&nbsp;
                            <Link
                                to={'/sign-up'}
                                className='text-blue-600'
                            >
                                Signup Now
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignIn
