import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HeroLayout from "./layouts/HeroLayout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Layout from "./layouts/Layout";
import AddResource from "./pages/AddResource";
import { useAppContext } from "./contexts/AppContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import MyResources from "./pages/MyResources";

const App = () => {
	const { isLoggedIn } = useAppContext();
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						isLoggedIn ? (
							<Layout>
								<Home />
							</Layout>
						) : (
							<HeroLayout>
								<Landing />
							</HeroLayout>
						)
					}
				/>
				<Route
					path="/search"
					element={
						<Layout>
							<p>Search Page</p>
						</Layout>
					}
				/>
				<Route
					path="/register"
					element={
						<Layout>
							<Register />
						</Layout>
					}
				/>
				<Route
					path="/sign-in"
					element={
						<Layout>
							<SignIn />
						</Layout>
					}
				/>
				{isLoggedIn && (
					<>
						<Route
							path="/add-resource"
							element={
								<Layout>
									<AddResource />
								</Layout>
							}
						/>
						<Route
							path="/my-resources"
							element={
								<Layout>
									<MyResources />
								</Layout>
							}
						/>
					</>
				)}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
