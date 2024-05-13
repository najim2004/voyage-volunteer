import { useContext, useRef } from "react";
import { AuthData } from "../../Context/AuthProvider";
import Lottie from "lottie-react";
import contactUs from "/public/contact-us.json";

const ContactUs = () => {
  const { themeData } = useContext(AuthData);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  };
  return (
    <div className="  min-h-screen mx-auto ">
      <div className="max-w-[1200px]  mx-auto">
        <div className="text-center mt-4 mb-4">
          <h3 className=" text-3xl font-semibold">Contact Us</h3>

          <p className="text-center max-w-[650px] mt-4 mx-auto">
            compiles a diverse array of artistic creations and craft projects,
            inspiring creativity and offering endless DIY possibilities.
          </p>
        </div>
        <hr className="border border-gray-400"/>
        <div className="grid  mt-4 lg:mt-6 px-3 grid-cols-1 lg:grid-cols-2">
          <Lottie className="max-w-[500px]" animationData={contactUs} />

          <div className="p-3">
            <h3 className="text-2xl font-semibold text-center">Message Us</h3>
            <p className="my-4 text-center">
              Connect with us easily through our 'Contact Us' page. We're here
              to answer your questions and address any concerns promptly.
            </p>

            <hr className="w-full my-6 border-cRed h-[1px]" />

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-3"
            >
              <div className="form-group">
                <label className="font-medium" htmlFor="name">
                  YOUR FULL NAME:
                </label>
                <br />
                <input
                  ref={nameRef}
                  placeholder="Your Full Name"
                  className="p-5 bg-white border-[1px] h-10 w-full rounded-[5px]"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="font-medium" htmlFor="email">
                  YOUR EMAIL ADDRESS:
                </label>
                <br />
                <input
                  ref={emailRef}
                  placeholder="Your Email Address"
                  className="p-5 bg-white border-[1px] h-10 w-full rounded-[5px]"
                  type="email"
                  required
                />
              </div>
              <div className="form-group lg:col-span-2">
                <label className="font-medium">YOUR MESSAGE:</label>
                <br />
                <textarea
                  ref={messageRef}
                  placeholder="Type Your Message Here"
                  className="p-5 bg-white border-[1px] w-full h-[200px] rounded-[5px]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full lg:col-span-2 rounded-sm btn bg-cRed text-white text-xl font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
