import { useState } from "react"
import EyeIcon from "./eyeIcon.svg"
import EyeOffIcon from "./eyeOffIcon.svg"
import logo from "./logo.svg"

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	})

	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [successMessage, setSuccessMessage] = useState("")

	const togglePassword = () => setShowPassword(prev => !prev)

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		setErrors(prev => ({ ...prev, [name]: "" }))
	}

	const validate = () => {
		const newErrors = {}

		if (!formData.username.trim()) {
			newErrors.username = "Username is required"
		}

		if (!formData.email) {
			newErrors.email = "Email is required"
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format"
		}

		if (!formData.password) {
			newErrors.password = "Password is required"
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters"
		}

		return newErrors
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setSuccessMessage("")
		const validationErrors = validate()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		setIsSubmitting(true)

		await new Promise(resolve => setTimeout(resolve, 1000))

		setSuccessMessage("🎉 Login successful!")
		console.log("Form Data:", formData)
		setFormData({ username: "", email: "", password: "" })
		setIsSubmitting(false)

		setTimeout(() => {
			setSuccessMessage("")
		}, 3000)
	}

	return (
		<div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-transparent text-white text-center">
				<div className="flex justify-center mb-8">
					<img src={logo} alt="Logo" />
				</div>

				<h2 className="text-2xl font-bold mb-6">Sign in to your account</h2>

				{successMessage && (
					<div className="mt-4 mb-4 p-3 text-sm text-green-500 bg-green-900 rounded-md animate-fade-in-out transition-all">
						{successMessage}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4 text-left">
					<div>
						<label className="block mb-1 text-sm font-medium">Username</label>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className={`w-full px-4 py-2 bg-[#1E293B] text-white border rounded-md focus:outline-none focus:ring-2 ${
								errors.username
									? "border-red-500 focus:ring-red-500"
									: "border-[#334155] focus:ring-indigo-500"
							}`}
							placeholder="Username"
						/>
						{errors.username && (
							<p className="text-red-500 text-xs mt-1">{errors.username}</p>
						)}
					</div>
					<div>
						<label className="block mb-1 text-sm font-medium">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={`w-full px-4 py-2 bg-[#1E293B] text-white border rounded-md focus:outline-none focus:ring-2 ${
								errors.email
									? "border-red-500 focus:ring-red-500"
									: "border-[#334155] focus:ring-indigo-500"
							}`}
							placeholder="you@example.com"
						/>
						{errors.email && (
							<p className="text-red-500 text-xs mt-1">{errors.email}</p>
						)}
					</div>
					<div>
						<label className="block mb-1 text-sm font-medium flex justify-between">
							<span>Password</span>
							<a href="#" className="text-indigo-400 text-sm hover:underline">
								Forgot password?
							</a>
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password}
								onChange={handleChange}
								className={`w-full px-4 py-2 bg-[#1E293B] text-white border rounded-md focus:outline-none focus:ring-2 ${
									errors.password
										? "border-red-500 focus:ring-red-500"
										: "border-[#334155] focus:ring-indigo-500"
								}`}
								placeholder="••••••••"
							/>
							<button
								type="button"
								onClick={togglePassword}
								className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
								tabIndex={-1}
							>
								<img
									src={showPassword ? EyeIcon : EyeOffIcon}
									alt="toggle visibility"
									className="h-5 w-5"
								/>
							</button>
						</div>
						{errors.password && (
							<p className="text-red-500 text-xs mt-1">{errors.password}</p>
						)}
					</div>
					<button
						type="submit"
						disabled={isSubmitting}
						className={`w-full py-2 mt-4 rounded-md font-semibold transition duration-150 ${
							isSubmitting
								? "bg-indigo-400 cursor-not-allowed"
								: "bg-indigo-600 hover:bg-indigo-700"
						}`}
					>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</button>
				</form>
				<p className="mt-6 text-sm text-gray-400">
					Not a member?{" "}
					<a href="#" className="text-indigo-400 hover:underline">
						Start a 14 day free trial
					</a>
				</p>
			</div>
		</div>
	)
}

export default LoginForm