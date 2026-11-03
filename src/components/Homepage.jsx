
import { useEffect, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";

const Homepage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getProducts = async () => {

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "https://dummyjson.com/products"
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();

            setProducts(data.products);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center
bg-linear-to-br from-violet-100 via-white to-purple-100 p-5">

                <div className="relative w-full max-w-md bg-white/80
    backdrop-blur-xl border border-white rounded-3xl
    shadow-2xl shadow-purple-200/50 p-8 text-center
    overflow-hidden">

                    <div className="absolute -top-20 -right-20
        w-40 h-40 bg-purple-300/30 blur-3xl rounded-full">
                    </div>

                    <div className="relative mx-auto mb-6 w-20 h-20
        rounded-full bg-red-50 flex items-center justify-center
        ring-8 ring-red-50/50">

                        <svg
                            className="w-10 h-10 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v4m0 4h.01M10.3 3.86L2.5 17.5A2
                    2 0 004.2 20.5h15.6a2 2 0 001.7-3L13.7
                    3.86a2 2 0 00-3.4 0z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Oops! Something Went Wrong
                    </h2>

                    <p className="text-gray-500 mt-3 leading-relaxed">
                        We couldn't load your products. Please check your
                        internet connection and try again.
                    </p>

                    <div className="bg-red-50 border border-red-100
        rounded-xl px-4 py-3 mt-5 text-sm text-red-600">
                        {error}
                    </div>

                    <button
                        onClick={getProducts}
                        className="group relative cursor-pointer overflow-hidden mt-7 w-full
            bg-purple-600 text-white py-3.5 rounded-xl
            font-semibold shadow-lg shadow-purple-200
            transition-all duration-300
            hover:bg-purple-700 hover:shadow-purple-300
            active:scale-[0.97]"
                    >
                        <span className="absolute inset-0 bg-white/20
            -translate-x-full group-hover:translate-x-full
            transition-transform duration-700">
                        </span>

                        <span className="relative flex items-center
            justify-center gap-2">
                            Try Again
                            <span className="group-hover:translate-x-1
                transition-transform duration-300">
                                →
                            </span>
                        </span>
                    </button>

                    <p className="text-xs text-gray-400 mt-5">
                        Don't worry, your data is safe.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">

            <h1 className="text-3xl font-bold text-center mb-8">
                Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {products.map((item) => (

                    <div className="bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl p-4 flex flex-col h-full">

                        <img
                            src={item.thumbnail}
                            className="w-full h-48 object-cover"
                        />

                        <div className="flex flex-col flex-1 justify-between">

                            <div>
                                <h2 className="text-lg font-bold mt-4">
                                    {item.title}
                                </h2>

                                <p className="text-gray-500 mt-2 line-clamp-2">
                                    {item.description}
                                </p>
                            </div>

                            <div>
                                <div className="flex justify-between mt-4">
                                    <h3 className="font-bold">${item.price}</h3>
                                    <span>⭐ {item.rating}</span>
                                </div>

                                <button
                                    className="relative cursor-pointer overflow-hidden w-full bg-transparent
  border border-purple-600 text-purple-600 py-3 rounded-xl
  mt-4 font-semibold transition-colors duration-300
  before:content-[''] before:absolute before:inset-0
  before:bg-purple-600 before:scale-x-0
  before:origin-left before:transition-transform
  before:duration-500 before:ease-in-out
  hover:before:scale-x-100
  hover:text-white"
                                >
                                    <span className="relative z-10">
                                        Add To Cart
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
};

export default Homepage;
