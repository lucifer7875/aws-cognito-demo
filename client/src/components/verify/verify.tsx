import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'

type FormData = {
    user: string;
    code: string;
};
const Verify = () => {
    const navigate = useNavigate()
    const { id } = useParams()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            user: id,
            code: "",
        }
    })
    const submitData: SubmitHandler<FormData> = async (data) => {
        const payload = {
            user: id,
            code: data.code,
        }
        await axios.post(`http://localhost:4000/auth/code`, payload).then((res) => {
            if (res?.data?.result === "SUCCESS") {
                alert('code verify successfully')
                navigate(`/`)
                // console.log("40", res)
            } else {
                alert("enter wrong code")
            }
        })
    }

    return (
        <div>
            <section className="text-gray-600 body-font relative ">
                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 mx-auto">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font mx-auto">Enter Verification Code</h2>
                        <form>

                            <div className="relative mb-4">
                                <input type="text" id="text" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register('code', { required: 'Verification code is required.' })}
                                />
                                {errors.code && (
                                    <span className='text-red-600 text-danger'>
                                        {errors.code.message?.toString()}
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

export default Verify