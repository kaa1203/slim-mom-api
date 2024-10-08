import Joi from 'joi';

const validator = schema => payload => schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi
	.string()
	.email({
		minDomainSegments: 2,
		tlds: {
			allow: ['com', 'net']
		}
	})
	.required()
	.messages({
		'any.required': 'Email is required!',
		'string.email': 'Invalid email!'
	}),
	password: Joi
	.string()
	.min(6)
	.max(16)
	.required()
	.messages({
		'any.required': 'Password is required!',
		'string.min': 'Password must be atleast 6 characters long!',
		'string.max': 'Password must not exceed {#limit} characters!'
	})
});

const signinSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

const entrySchema = Joi.object({
	food: Joi.object({
		_id: Joi.string().required(),
		categories: Joi.string().required(),
		weight: Joi.number().required(),
		title: Joi.string().required(),
		calories: Joi.number().required(),
		groupBloodNotAllowed: Joi.array().items().required(),
		__v: Joi.number(),
	})
});

export const signupValidator = validator(signupSchema);
export const signinValidator = validator(signinSchema);
export const entryValidator = validator(entrySchema);