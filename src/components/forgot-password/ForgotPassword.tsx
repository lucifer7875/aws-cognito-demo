import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type FormData = {
    email: string;
};

const ForgotPassword = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: ''
        }
    })
    const submitData: SubmitHandler<FormData> = async (data) => {
        const payload = {
            email: data.email,
        }
        await axios.post(`http://localhost:4000/auth/forgot-password`, payload).then((res) => {
            console.log("29", res)
            if (res?.data?.result) {
                alert('Reset password code sent successfully')
                navigate(`/reset-password/${payload.email}`)
            } else {
                alert("Enter wrong email id")
            }
        })
    }

    return (
        <div>
            <section className="text-gray-600 body-font relative ">
                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 mx-auto">
                        <p className="text-gray-900 text-3xl mb-1 font-medium title-font mx-auto">Forgot Password</p>
                        <form>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="text" id="text" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register('email', { required: 'Email Id is required.' })}
                                />
                                {errors.email && (
                                    <span className='text-red-600 text-danger'>
                                        {errors.email.message?.toString()}
                                    </span>
                                )}
                            </div>
                        </form>
                        <button
                            className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                            onClick={handleSubmit(submitData)}
                        >Submit
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgotPassword