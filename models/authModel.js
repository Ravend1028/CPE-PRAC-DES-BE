import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  vitalStatistics: {
    height: {
      type: Number,
      default: 0,
      required: true
    },

    weight: {
      type: Number,
      default: 0,
      required: true
    },

    BMI: {
      type: Number,
      default: 0,
      required: true
    },

    bodyTemperature: {
      type: Number,
      default: 0,
      required: true
    },

    respiratoryRate: {
      type: Number,
      default: 0,
      required: true
    },

    bloodOxygenLevel: {
      type: Number,
      default: 0,
      required: true
    },

    pulseRate: {
      type: Number,
      default: 0,
      required: true
    },

    bloodPressure: {
      type: String,
      default: 0,
      required: true
    },

    waist: {
      type: Number,
      default: 0,
      required: true
    },

    hips: {
      type: Number,
      default: 0,
      required: true
    },

    smokerOrNo: {
      type: Boolean,
      default: 0,
      required: true
    },
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;



