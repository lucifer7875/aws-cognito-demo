import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from "axios"

type FormData = {
    email: string;
    newPassword: string;
    confirmationCode: string;
};

const ResetPassword = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: id,
            newPassword: "",
            confirmationCode: ""
        }
    })
    const submitData: SubmitHandler<FormData> = async (data) => {
        const payload = {
            email: data.email,
            newPassword: data.newPassword,
            confirmationCode: data.confirmationCode,
        }

        // console.log("36", payload)


        await axios.post(`http://localhost:4000/auth/reset-password`, payload).then((res) => {
            console.log("36", res?.status)
            if (res?.status === 200) {
                alert(res?.data?.message)
                navigate(`/`)
            }
        })
    }


    return (
        <div>
            <section className="text-gray-600 body-font relative ">
                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 mx-auto">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font mx-auto">Reset Password</h2>
                        <form>

                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">New Password</label>
                                <input type="password" id="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register('newPassword', { required: 'Password is required.' })}
                                />
                                {errors.newPassword && (
                                    <span className='text-red-600 text-danger'>
                                        {errors.newPassword?.message?.toString()}
                                    </span>
                                )}
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Confirmation code</label>
                                <input type="text" id="confirmationCode" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register('confirmationCode', { required: 'Confirmation code is required.' })}
                                />
                                {errors.confirmationCode && (
                                    <span className='text-red-600 text-danger'>
                                        {errors.confirmationCode?.message?.toString()}
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

export default ResetPassword
