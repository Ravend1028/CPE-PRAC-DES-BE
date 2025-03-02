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
      default: 0
    },

    weight: {
      type: Number,
      default: 0
    },

    bodyTemperature: {
      type: Number,
      default: 0
    },

    pulseRate: {
      type: Number,
      default: 0
    },

    bloodPressure: {
      type: Number,
      default: 0
    },

    respiratoryRate: {
      type: Number,
      default: 0
    },

    bloodOxygenLevel: {
      type: Number,
      default: 0
    },

    BMI: {
      type: Number,
      default: 0
    },

    waistCircumference: {
      type: Number,
      default: 0
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

const User = mongoose.model('User', userSchema);

export default User;



