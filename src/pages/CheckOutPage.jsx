import React from "react";
import { motion } from "framer-motion";
import { BsFillInboxFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
//hooks
import { useBookShopContext } from "../hooks/useBookShopContext";

const CheckOutPage = () => {
  const {
    selectedBook,
    handleBookCart,
    handleRemoveBook,
    handleBookCount,
    handleRemoveBookCount,
  } = useBookShopContext();

  const total = selectedBook.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue?.attributes?.price * currentValue.quantity,
    0
  );

  const handleClick = () => {
    alert("Check Out Page is coming soon !!!! ");
  };
  const discountPrice = (price, discount) =>
    (price - (price * discount) / 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.02 }}
      className="flex flex-col bg-background_color h-screen pt-16 overflow-auto"
    >
      <h3 className="text-2xl font-bold text-center text-secondary mt-5 mb-20 md:mb-10">
        My Cart
      </h3>

      {selectedBook.length === 0 && (
        <div className="card justify-center w-auto">
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              <BsFillInboxFill size={100} className="text-primary" />
            </h2>
            <p className="text-bold text-2xl text-secondary">
              There is no book related with your cart!
              <Link to={"/shop"}>
                <button className=" btn btn-primary ml-3">Go to Shop</button>
              </Link>
            </p>
          </div>
        </div>
      )}

      <div>
        {selectedBook.map((selectedItem) => (
          <div
            key={selectedItem?.id}
            className=" md:w-2/3 lg:w-1/2 mx-auto grid grid-cols-3 items-center mb-5  md:p-5 lg:p-8 justify-between border relative"
          >
            <div>
              <figure className="col-span-1">
                <img
                  src={`https://book-library-backend-production.up.railway.app${selectedItem.attributes.image.data[0].attributes.url}`}
                  // src = `http://localhost:1337${data[0].attributes.url}`
                  alt="a"
                  className="h-24 object-fill mx-auto mt-3"
                />
              </figure>
              <div className=" text-center text-text_color md:text-xl p-3">
                {selectedItem.attributes.title}
              </div>
            </div>
            <div className=" col-span-1 p-3 flex gap-5 justify-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleBookCart(selectedItem), handleBookCount();
                }}
              >
                +
              </button>
              <button
                className="btn btn-primary "
                onClick={() => {
                  handleRemoveBook(selectedItem), handleRemoveBookCount();
                }}
              >
                -
              </button>
            </div>
            <p className=" col-span-1 text-end  p-3 md:text-xl text-secondary ">
              {selectedItem.quantity} * $
              {discountPrice(
                selectedItem?.attributes?.price,
                selectedItem?.attributes?.discount
              )}
            </p>
          </div>
        ))}
        {selectedBook.length !== 0 && (
          <>
            <div className="md:w-2/3 lg:w-1/2 p-3 mx-auto flex justify-end md:mt-10">
              <h3 className="text-2xl font-bold  text-secondary">Total - </h3>
              <p className="text-right text-2xl  text-secondary">
                ${total.toFixed(2)}
              </p>
            </div>
            <div className="md:w-2/3 lg:w-1/2 p-3 mx-auto flex  justify-end">
              {/* The button to open modal */}
              <label htmlFor="my-modal-3" className="btn btn-primary">
                Check Out
              </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal ">
                <div className="modal-box relative ">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle btn-outline btn-secondary absolute right-2 top-2 "
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold text-text_color">
                    Check Out
                  </h3>
                  <p className="py-4 text-text_color opacity-70">
                    Your order is processing. Be ready to receive your products.
                  </p>
                  <Link to={"/shop"}>
                    <button className=" btn btn-sm btn-primary btn-outline">
                      {" "}
                      shop more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

export default CheckOutPage;
