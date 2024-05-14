import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FormData = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
};

const SignUp = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone_number: ""
        }
    })
    const submitData: SubmitHandler<FormData> = async (data) => {
        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone_number: data.phone_number,
        }

        // console.log("36", payload)


        await axios.post(`http://localhost:4000/auth/signup`, payload).then((res) => {
            if (res?.data?.result?.sucess) {
                localStorage.setItem("UserData", JSON.stringify(payload))
                toast.success('Please enter verification code')
                setTimeout(() => {
                    navigate(`/verify/${payload?.email}`)
                }, 1500);
            }
        })
    }


    return (
        <div>
            <ToastContainer limit={1} autoClose={1000} />
            <section className="text-gray-600 body-font relative ">
                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 mx-auto">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font mx-auto">Register</h2>
                        <form>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Name</label>
                                <input type="text" id="text" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register('name', { required: 'Name is required.' })}
                                />
                                {errors.name && (
                                    <span className='text-red-600 text-danger'>
                                        {errors.name.message?.toString()}
                                    </span>
                                )}
                            </div>
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
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Phone Number</label>
                                <input type="text" id="phone_number" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register('phone_number', { required: 'Phone Number is required.' })}
                                />
                                {errors.phone_number && (
                                    <span className='text-red-600 text-danger'>
                                        {errors.phone_number?.message?.toString()}
                                    </span>
                                )}
                            </div>
                        </form>

                        <button
                            className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                            onClick={handleSubmit(submitData)}
                        >Register
                        </button>
                        <p
                            className="text-gray-500 mt-3"
                        >
                            Already registered?&nbsp;
                            <Link
                                to={'/'}
                                className='text-blue-600'
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp
