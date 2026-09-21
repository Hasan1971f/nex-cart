import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      
      <Navbar/>

      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-primary">NEXCART</span>
        </h1>

        <p className="mt-4 text-base-content/60">
          Everything You Need, One Smart Cart.
        </p>
      </main>
    </>
  );
}

export default App;